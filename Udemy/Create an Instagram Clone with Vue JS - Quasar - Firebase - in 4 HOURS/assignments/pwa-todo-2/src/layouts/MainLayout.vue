<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          PWA Todo 2
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-toolbar>
        <q-btn
          v-if="isNotificationSupported"
          @click="enableNotifications"
          label="Enable Notifications"
          class="col"
          no-caps
          dense
        />
        <q-btn
          v-if="showInstallAppButton"
          @click="installApp"
          label="Install App"
          class="col"
          no-caps
          dense
        />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  let deferredPrompt;
  let reg;
  const qs = require("qs");

  export default {
    name: 'MainLayout',

    data () {
      return {
        showInstallAppButton: false
      }
    },

    computed: {
      isNotificationSupported() {
        return "PushManager" in window;
      },

      isServiceWorkerSupported() {
        return "serviceWorker" in navigator;
      }
    },

    methods: {
      installApp() {
        this.showInstallAppButton = false;
        deferredPrompt.prompt()
      },

      enableNotifications() {
        if (this.isNotificationSupported) {
          Notification.requestPermission(result => {
            if (result === "granted") {
              this.checkForExistingPushSubscription()
            }
          })
        }
      },

      checkForExistingPushSubscription() {
        if (this.isServiceWorkerSupported && this.isNotificationSupported) {
          navigator.serviceWorker.ready.then(swreg => {
            reg = swreg;
            return swreg.pushManager.getSubscription()
          }).then(sub => {
            if (!sub) {
              this.createPushSubscription()
            }
          })
        }
      },

      createPushSubscription() {
        const vapidPublicKey = "BMsXRZRzoE9GGo3uHw__aIUNuqBXusySttthTqIYpcytfxncLpudvhVzU_hYRTYgqjQzMoirpiJp_wsrZuQ1NhA";
        const vapidPublicKeyConverted = this.urlBase64ToUint8Array(vapidPublicKey)

        reg.pushManager.subscribe({
          applicationServerKey: vapidPublicKeyConverted,
          userVisibleOnly: true
        }).then(newSub => {
          const newSubStringified = JSON.stringify(newSub);
          let newSubJSON = JSON.parse(newSubStringified);
          newSubJSON = newSub.toJSON();
          let newSubJSONQueryString = qs.stringify(newSubJSON)

          this.$axios.post(`http://localhost:3000/createSubscription?${newSubJSONQueryString}`)
            .then(response => {
              this.displaySubscribedNotification();
            }).catch(error => {
            console.log(error)
          })
        })
      },

      displaySubscribedNotification() {
        reg.showNotification("You're subscribed!");
      },

      urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      },
    },

    mounted() {
      window.addEventListener("beforeinstallprompt", event => {
        deferredPrompt = event;
        this.showInstallAppButton = true;
      })
    }
}
</script>
