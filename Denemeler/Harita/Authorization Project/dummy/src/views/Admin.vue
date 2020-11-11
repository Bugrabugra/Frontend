<template>
  <div>
    <h1>Admin sayfası</h1>
    <div id="mapContainer" style="text-align: center; margin: 0 auto; height: 50vh; width: 50%; justify-content: center"></div>
    <a href="/user">User</a>
  </div>
</template>

<script>
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import {Image as ImageLayer} from 'ol/layer';
  import ImageWMS from 'ol/source/ImageWMS';


  export default {
    name: 'Admin',
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

            new ImageLayer({
              extent: [-13884991, 2870341, -7455066, 6338219],
              source: new ImageWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states'},
                ratio: 1,
                serverType: 'geoserver',
              }),
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
