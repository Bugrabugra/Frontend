<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          label="Back"
          no-caps
          flat
          dense
        />

        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          class="absolute-right q-pr-sm"
          to="/auth"
          icon="account_circle"
          label="Login"
          no-caps
          flat
          dense
        />

        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          Logout<br>
          {{userDetails.name}}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import mixinOtherUserDetails from "src/mixins/mixin-other-user-details"


  export default {
    name: 'MainLayout',

    mixins: [mixinOtherUserDetails],

    computed: {
      ...mapState("store", ["userDetails"]),

      title() {
        const currentPath = this.$route.fullPath;

        if (currentPath === "/") {
          return "SmackChat";
        } else if (currentPath.includes("/chat")) {
          return this.otherUserDetails.name;
        } else if (currentPath === "/auth") {
          return "Login";
        }
      }
    },

    methods: {
      ...mapActions("store", ["logoutUser"])
    }
  }
</script>

<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height 1.2
</style>
