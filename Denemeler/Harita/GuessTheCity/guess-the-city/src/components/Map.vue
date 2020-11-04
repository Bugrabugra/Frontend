<template>
  <div id="container">
    <div id="mapContainer" style="height:100vh">

    </div>
  </div>
  </template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import FeatureLayer from "esri-leaflet/src/Layers/FeatureLayer/FeatureLayer"


  export default {
    name: "Map",

    data() {
      return {
        countries: {},
        myMap: {}
      }
    },

    methods: {
      initMap() {
        this.myMap = L.map('mapContainer').setView([0, 0], 2);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        this.countries = new FeatureLayer({
          url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0',
          simplifyFactor: 1
        });

        this.countries.addTo(this.myMap);
      },

      findCountry(country) {
        this.countries.query().where(`COUNTRY='${country}'`).run(function(error, featureCollection){
          console.log(featureCollection);
          const featureGeoJSON = L.geoJSON(featureCollection);
          console.log(featureGeoJSON);
          featureGeoJSON.addTo(this.myMap);
          this.myMap.fitBounds(featureGeoJSON.getBounds())
        });
      }
    },

    mounted() {
      this.initMap();
    }
  }
</script>

<style scoped>

</style>