<template>
  <div id="mapContainer" style="height: 100vh">

  </div>
</template>

<script>
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';


  export default {
    name: "Main",

    data() {
      return {

      }
    },

    methods: {
      initMap() {
        const map = new Map({
          target: 'mapContainer',
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: [0, 0],
            zoom: 0
          })
        });

        console.log(map)
      }
    },

    mounted() {
      this.initMap();
    }
  }
</script>

<style scoped>

</style>