<template>
  <v-container class="pa-0" style="height: 100%;">
    <!--Map container-->
    <div id="map" style="height: 100% !important;"></div>
  </v-container>
</template>

<script>
  import {loadedGoogleMapsAPI} from "../main";


  export default {
    name: 'Map',

    data() {
      return {
        map: null,
      }
    },

    mounted() {
      loadedGoogleMapsAPI.then(()=>{
        this.initMap();
      });
    },

    methods: {
      initMap() {
        const _this = this;
        setTimeout(() => {
          this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: { lat: 36.833, lng: -99.903 },
            mapTypeId: "satellite",
          });

          this.$store.dispatch("setMap", this.map);
        }, 500)
      },
    }
  }
</script>