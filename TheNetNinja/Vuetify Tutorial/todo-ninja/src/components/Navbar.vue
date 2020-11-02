<template>
  <nav>
    <v-app-bar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <v-app-bar-nav-icon class="grey--text" v-on:click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="grey--text">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        app
        persistent
        width="300"
        hide-overlay
        v-bind:mini-variant.sync="mini"
        fixed
        v-model="drawer"
        class="primary"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-layout justify-center>
            <v-avatar size="100">
              <img src="/avatar-1.png" alt="none">
            </v-avatar>
          </v-layout>

          <p class="white--text headline mt-1">
            The Net Ninja
          </p>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-item v-for="link in links" v-bind:key="link.text" router v-bind:to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        drawer: false,
        mini: false,
        links: [
          {icon: "mdi-view-dashboard", text: "Dashboard", route: "/"},
          {icon: "mdi-folder", text: "My Projects", route: "/projects"},
          {icon: "mdi-account", text: "Team", route: "/team"}
        ]
      }
    }
  }
</script>

<style scoped>

</style>