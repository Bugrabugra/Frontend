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
          class="absolute-right q-pr-sm"
          to="/auth"
          icon="account_circle"
          label="Login"
          no-caps
          flat
          dense
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    name: 'MainLayout',

    components: {},

    computed: {
      title() {
        const currentPath = this.$route.fullPath;

        if (currentPath === "/") {
          return "SmackChat";
        } else if (currentPath === "/chat") {
          return "Chat";
        } else if (currentPath === "/auth") {
          return "Login";
        }
      }
    }
  }
</script>
