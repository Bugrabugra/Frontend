<template>
  <div>
    <div id="panorama"/>
    <div>
      <v-btn
          class="mt-1 close-button"
          @click="closeStreetView"
      >
        Close
      </v-btn>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "StreetView",

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
      },

      closeStreetView() {
        this.$store.dispatch("setPanorama", false);
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

  .close-button {
    position: absolute;
    right: -4px;
    border-radius: 0;
    float: right;
  }
</style>