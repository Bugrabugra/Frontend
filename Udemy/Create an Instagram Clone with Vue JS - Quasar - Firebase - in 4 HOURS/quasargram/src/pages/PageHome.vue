<template>
  <q-page class="constrain q-pa-md">

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="showNotificationsBanner && isPushNotificationsSupported"
        class="banner-container bg-primary"
      >
        <div class="constrain">
          <q-banner
            class="bg-grey-3 q-mb-md"
          >
            <template v-slot:avatar>
              <q-icon
                name="eva-bell-outline"
                color="primary"
              />
            </template>
            Would you like to enable notifications

            <template v-slot:action>
              <q-btn
                @click="enableNotifications"
                label="Yes"
                class="q-px-sm"
                color="primary"
                flat
                dense
              />

              <q-btn
                @click="showNotificationsBanner = false"
                label="Later"
                class="q-px-sm"
                color="primary"
                flat
                dense
              />

              <q-btn
                @click="neverShowNotificationsBanner"
                label="Never"
                class="q-px-sm"
                color="primary"
                flat
                dense
              />
            </template>

          </q-banner>
        </div>
      </div>
    </transition>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!isLoadingPosts && posts.length">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="card-post q-mb-md"
            :class="{'bg-red-1': post.offline}"
            flat
            bordered
          >
            <q-badge
              v-if="post.offline"
              color="red"
              class="badge-offline absolute-top-right"
            >
              Stored offline
            </q-badge>

            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://en.gravatar.com/userimage/40865718/759bee84f8372295d42852993be4f6fd.jpeg">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">bugra_otken</q-item-label>
                <q-item-label caption>{{post.location}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator/>

            <q-img :src="post.imageURL"/>

            <q-card-section>
              <div>{{post.caption}}</div>
              <div class="text-caption text-grey">{{post.date | niceDate}}</div>
            </q-card-section>

          </q-card>
        </template>

        <template v-else-if="!isLoadingPosts && !posts.length">
          <h5 class="text-center text-grey">No posts yet...</h5>
        </template>

        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade"/>
                </q-item-label>

                <q-item-label caption>
                  <q-skeleton type="text" animation="fade"/>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade"/>

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade"/>
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade"/>

            </q-card-section>
          </q-card>
        </template>

      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://en.gravatar.com/userimage/40865718/759bee84f8372295d42852993be4f6fd.jpeg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">bugra_otken</q-item-label>
            <q-item-label caption>Buğra Otken</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>


  </q-page>
</template>

<script>
  import {date} from "quasar";
  import {openDB} from "idb";
  const qs = require("qs");


  export default {
    name: 'PageHome',

    data() {
      return {
        posts: [],
        isLoadingPosts: false,
        showNotificationsBanner: false
      }
    },

    computed: {
      isServiceWorkerSupported() {
        return "serviceWorker" in navigator;
      },

      isPushNotificationsSupported() {
        return "PushManager" in window;
      }
    },

    methods: {
      getPosts() {
        this.isLoadingPosts = true;

        this.$axios.get(`${process.env.API}/posts`)
          .then(response => {
            this.posts = response.data;
            this.isLoadingPosts = false;
            if (!navigator.onLine) {
              this.getOfflinePosts();
            }
          })
          .catch(error => {
            this.isLoadingPosts = false;
            this.$q.dialog({
              title: "Error",
              message: "Could not download posts!"
            })
          })

      },

      getOfflinePosts() {
        const db = openDB("workbox-background-sync")
          .then(db => {
            db.getAll("requests")
              .then(failedRequests => {
                failedRequests.forEach(failedRequest => {
                  if (failedRequest.queueName === "queueCreatePost") {
                    let request = new Request(failedRequest.requestData.url, failedRequest.requestData);
                    request.formData().then(formData => {
                      let offlinePost = {};
                      offlinePost.id = formData.get("id");
                      offlinePost.caption = formData.get("caption");
                      offlinePost.location = formData.get("location");
                      offlinePost.date = parseInt(formData.get("date"));
                      offlinePost.offline = true;

                      let reader = new FileReader();
                      reader.readAsDataURL(formData.get("file"));
                      reader.onloadend = () => {
                        offlinePost.imageURL = reader.result;
                        this.posts.unshift(offlinePost);
                      }
                    })
                  }
                })
              })
              .catch(error => {
                console.log("Error accessing IndexDB: ", error);
              })
          })
      },

      listenForOfflinePostUploaded() {
        if (this.isServiceWorkerSupported) {
          const channel = new BroadcastChannel("sw-messages");
          channel.addEventListener("message", event => {
            console.log("Receiver", event.data);

            if (event.data.msg === "offline-post-uploaded") {
              const offlinePostCount = this.posts.filter(post => {
                return post.offline === true;
              }).length;

              this.posts[offlinePostCount - 1].offline = false;
            }
          })
        }
      },

      initNotificationsBanner() {
        const neverShowNotificationsBanner = this.$q.localStorage.getItem("neverShowNotificationsBanner")

        if (!neverShowNotificationsBanner) {
          this.showNotificationsBanner = true;
        }
      },

      enableNotifications() {
        if (this.isPushNotificationsSupported) {
          Notification.requestPermission(result => {
            console.log("result: ", result);
            this.neverShowNotificationsBanner();
            if (result === "granted") {
              // this.displayGrantedNotification();
              this.checkForExistingPushSubscription();
            }
          })
        }
      },

      checkForExistingPushSubscription() {
        if (this.isServiceWorkerSupported && this.isPushNotificationsSupported) {
          let reg;
          navigator.serviceWorker.ready.then(swreg => {
            reg = swreg;
            return swreg.pushManager.getSubscription()
          }).then(sub => {
            if (!sub) {
              this.createPushSubscription(reg);
            }
          })
        }
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

      createPushSubscription(reg) {
        const vapidPublicKey = "BD3aTofWWx6vje4CnMpyK0oIlXz-Xy9m1ljou1Sbd7vZP3HtlajULG9WdsOcvqg78Z8ja3NXQhPjszaGJ_Tw24s";

        const vapidPublicKeyConverted = this.urlBase64ToUint8Array(vapidPublicKey);
        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidPublicKeyConverted
        }).then(newSub => {
          const newSubData = newSub.toJSON();
          const newSubDataQS = qs.stringify(newSubData)
          console.log("newSubData: ", newSubData);
          return this.$axios.post(`${process.env.API}/createSubscription?${newSubDataQS}`)
        }).then(response => {
          this.displayGrantedNotification();
        }).catch(error => {
          console.log("error: ", error)
        })
      },

      neverShowNotificationsBanner() {
        this.showNotificationsBanner = false;
        this.$q.localStorage.set("neverShowNotificationsBanner", true);
      },

      displayGrantedNotification() {
        // new Notification(
        //   "You're subscribed to notifications!",
        //   {
        //     body: "Thanks for subscribing!",
        //     icon: "icons/icon-128x128.png",
        //     image: "icons/icon-128x128.png",
        //     badge: "icons/icon-128x128.png",
        //     dir: "ltr",
        //     lang: "en-US",
        //     vibrate: [100, 50, 200],
        //     tag: "confirm-notification",
        //     renotify: true
        //   }
        // )
        if (this.isServiceWorkerSupported && this.isPushNotificationsSupported) {
          navigator.serviceWorker.ready.then(swreg => {
            swreg.showNotification(
              "You're subscribed to notifications!",
              {
                body: "Thanks for subscribing!",
                icon: "icons/icon-128x128.png",
                image: "icons/icon-128x128.png",
                badge: "icons/icon-128x128.png",
                dir: "ltr",
                lang: "en-US",
                vibrate: [100, 50, 200],
                tag: "confirm-notification",
                renotify: true,
                actions: [
                  {
                    action: "hello",
                    title: "Hello",
                    icon: "icons/icon-128x128.png"
                  },
                  {
                    action: "goodbye",
                    title: "Goodbye",
                    icon: "icons/icon-128x128.png"
                  }
                ]
              }
            );
          })
        }
      }
    },

    activated() {
      this.getPosts();
    },

    mounted() {
      this.listenForOfflinePostUploaded();
      this.initNotificationsBanner();
    },

    filters: {
      niceDate(value) {
        return date.formatDate(value, "MMMM D h:mmA")
      }
    }
  }
</script>

<style lang="sass">
  .card-post
    .badge-offline
      border-top-left-radius: 0 !important
    .q-img
      min-height: 200px
</style>
