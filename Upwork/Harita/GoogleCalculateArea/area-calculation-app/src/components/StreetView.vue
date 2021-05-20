<template>
  <div id="panorama"/>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "StreetView",

    data() {
      return {}
    },

    computed: {
      ...mapGetters(["getLocation", "getMap"])
    },

    methods: {
      initPanorama() {
        const panorama = new window.google.maps.StreetViewPanorama(
          document.getElementById("panorama"),
          {
            position: this.getLocation,
            pov: {
              heading: 0,
              pitch: 10,
            },
          }
        );

        this.getMap.setStreetView(panorama);
      }
    },

    mounted() {
      this.initPanorama()
    }
  }
</script>

<style scoped>
  #panorama {
    height: 100%;
    width: 100%;
  }
</style>