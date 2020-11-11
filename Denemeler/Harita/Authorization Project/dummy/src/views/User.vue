<template>
  <div>
    <h1>User sayfası</h1>
    <div id="mapContainer" style="text-align: center; margin: 0 auto; height: 50vh; width: 50%; justify-content: center"></div>
    <a href="/admin">Admin</a>
  </div>



</template>

<script>
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';

  export default {
    name: 'User',
    components: {

    },

    methods: {
      initMap() {
        const map = new Map({
          target: 'mapContainer',
          layers: [
            new TileLayer({
              source: new OSM()
            }),
          ],
          view: new View({
            center: [-10997148, 4569099],
            zoom: 4
          })
        });

        map.getView();
      },
    },

    mounted() {
      this.initMap();
    }
  }
</script>
