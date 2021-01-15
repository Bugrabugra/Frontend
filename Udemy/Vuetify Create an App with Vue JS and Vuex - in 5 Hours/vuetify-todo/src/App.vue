<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        :mobile-breakpoint="768"
        app
    >
      <v-img
          class="pa-4"
          src="astronomy.jpg"
          height="128"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="50" class="mb-2">
          <img src="vesikalık_k.png" alt="Bugra"/>
        </v-avatar>

        <div class="white--text text-subtitle-1 font-weight-bold">Buğra Otken</div>
        <div class="white--text text-subtitle-2">bugraotken</div>
      </v-img>

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
        :height="$route.path === '/' ? 220 : 140"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="pa-0 header-container pt-2">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"/>
          <v-spacer/>
          <Search/>
        </v-row>

        <v-row>
          <v-toolbar-title class="ml-4 mb-4 text-h4">{{$store.state.appTitle}}</v-toolbar-title>
        </v-row>

        <v-row>
          <LiveDateTime/>
        </v-row>

        <v-row class="mt-2" v-if="$route.path === '/'">
          <FieldAddTask/>
        </v-row>

      </v-container>
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
  import LiveDateTime from "./components/Tools/LiveDateTime";
  import FieldAddTask from "./components/Todo/FieldAddTask";


  export default {
    components: {
      FieldAddTask,
      LiveDateTime,
      Search,
      Snackbar
    },

    data: () => ({
      drawer: null,

      items: [
        {title: 'Todo', icon: 'mdi-format-list-checks', to: "/"},
        {title: 'About', icon: 'mdi-help-box', to: "/about"},
      ],
    }),

    mounted() {
      this.$store.dispatch("getTasks")
    }
  }
</script>

<style lang="sass">
  .header-container
    max-width: none !important
</style>