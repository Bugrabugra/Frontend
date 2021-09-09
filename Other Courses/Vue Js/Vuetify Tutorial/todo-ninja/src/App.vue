<template>
  <v-app>
    <Navbar/>
    <v-main class="grey lighten-2 ">
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";


  export default {
    name: 'App',

    components: {
      "Navbar": Navbar
    },

    data: () => ({

    }),
  };
</script>
