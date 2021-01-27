<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">Awesome Todo</q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
          flat
        />

        <q-btn
          v-else
          @click="logoutUser"
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
          flat
        />

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      v-model="leftDrawerOpen"
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{nav.label}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          class="text-grey-4 absolute-bottom"
          clickable
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import {mapState, mapActions} from "vuex";


  export default {
    name: 'MainLayout',

    components: {},

    data () {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        navs: [
          {label: "Todo", icon: "list", to: "/"},
          {label: "Settings", icon: "settings", to: "/settings"},
        ]
      }
    },

    computed: {
      ...mapState("auth", ["loggedIn"])
    },

    methods: {
      ...mapActions("auth", ["logoutUser"]),

      quitApp() {
        this.$q.dialog({
          title: "Confirm",
          message: "Really quit Awesome Todo?",
          cancel: true,
          persistent: true
        }).onOk(() =>{
          if (this.$q.platform.is.electron) {
            require("electron").ipcRenderer.send("quit-app")
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @media screen and (min-width: 768px){
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>
