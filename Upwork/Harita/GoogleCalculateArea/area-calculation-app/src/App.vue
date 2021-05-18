<template>
  <v-app>
    <Drawer v-if="!mini"/>
    <v-main>
      <Map style="width: 100%;"/>
      <DrawerMini v-if="mini"/>
    </v-main>
  </v-app>
</template>

<script>
  import Map from "./components/Map";
  import Drawer from "./components/Drawer";
  import Dialog from "./components/SaveAreaDialog";
  import DrawerMini from "./components/DrawerMini";


  export default {
    name: 'App',

    components: {
      DrawerMini,
      Dialog,
      Drawer,
      Map
    },

    data() {
      return {
        // mini: false
      }
    },

    computed: {
      mini() {
        if (
          this.$vuetify.breakpoint.name === "md" ||
          this.$vuetify.breakpoint.name === "sm" ||
          this.$vuetify.breakpoint.name === "xs"
        ) {
          return true
          // this.mini = true;
        }
      }
    },

    mounted() {

    }

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
