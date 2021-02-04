<template>
  <v-app id="toPDF">
    <Drawer/>
    <v-main>
      <Map/>
    </v-main>
  </v-app>
</template>

<script>
  import Map from "./components/Map";
  import Drawer from "./components/Drawer";
  import Dialog from "./components/SaveAreaDialog";


  export default {
    name: 'App',

    components: {
      Dialog,
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
