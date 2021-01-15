<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Vuetify Todo
          </v-list-item-title>
          <v-list-item-subtitle>
            Best Todo Ever!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        prominent
        color="primary"
        dark
        src="astronomy.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Vuetify Todo</v-app-bar-title>

      <v-spacer></v-spacer>

      <Search/>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <Snackbar/>
    </v-main>
  </v-app>
</template>

<script>
  import Snackbar from "./components/Shared/Snackbar";
  import Search from "./components/Tools/Search";


  export default {
    components: {
      Search,
      Snackbar},
    data: () => ({
      drawer: null,
      items: [
        {title: 'Todo', icon: 'mdi-format-list-checks', to: "/"},
        {title: 'About', icon: 'mdi-help-box', to: "/about"},
      ],
    }),
  }
</script>