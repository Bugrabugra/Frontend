<template>
  <div id="container">
    <div id="mapContainer">

    </div>

  </div>
  </template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import FeatureLayer from "esri-leaflet/src/Layers/FeatureLayer/FeatureLayer"


  export default {
    name: "Map",

    methods: {
      initMap() {
        const map = L.map('mapContainer').setView([0, 0], 2);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        const countries = new FeatureLayer({
          url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0',
          simplifyFactor: 1
        });

        // countries.addTo(map);

        countries.query().where("COUNTRY='Brazil'").run(function(error, featureCollection){
          const featureGeoJSON = L.geoJSON(featureCollection);
          featureGeoJSON.addTo(map);
          map.fitBounds(featureGeoJSON.getBounds())
        });
      }
    },

    mounted() {
      this.initMap();
    }
  }
</script>

<style scoped>
  #mapContainer {
    width: 99vw;
    height: 98vh;
  }
</style>