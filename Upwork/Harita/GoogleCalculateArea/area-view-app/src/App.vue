<template>
  <v-app>
    <v-main>
      <Drawer/>
      <Map/>
    </v-main>
  </v-app>
</template>

<script>
  import Map from "./components/Map";
  import Drawer from "./components/Drawer";


  export default {
    name: 'App',

    components: {
      Drawer,
      Map
    },

  };
</script>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  body::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
