<template>
  <div id="container">

    <!--Popup-->
    <v-dialog v-model="popup" width="500" style="z-index: 2">
      <v-card>
        <v-card-title class="headline grey">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="popup = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Map-->
    <div id="mapContainer" style="height:100vh; z-index: 1"></div>

  </div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import FeatureLayer from "esri-leaflet/src/Layers/FeatureLayer/FeatureLayer";


  export default {
    name: "Map",

    data() {
      return {
        countries: {},
        myMap: {},
        popup: false
      }
    },

    methods: {
      initMap() {
        this.myMap = L.map('mapContainer');
        this.myMap.setView([0, 0], 2);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        this.countries = new FeatureLayer({
          url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0',
          simplifyFactor: 0.2,
          style: {weight: 0.5}
        });

        this.countries.addTo(this.myMap);

        this.myMap.on("click", (e) => {
          this.clickCountry(e);
        })
      },

      findCountry(country, map) {
        this.countries.query().where(`COUNTRY='${country}'`).run(function(error, featureCollection){
          const featureGeoJSON = L.geoJSON(featureCollection);
          map.fitBounds(featureGeoJSON.getBounds());
        });
      },

      clickCountry(e) {
        this.countries.query()["intersects"](e.latlng).run(function(error, featureCollection) {
          const resultCountry = featureCollection.features[0].properties["COUNTRY"];
          console.log(resultCountry);
          if (resultCountry) {
            this.popup = true;
          }
        })
      }
    },

    mounted() {
      this.initMap();
      this.popup = false;
    }
  }
</script>

<style scoped>

</style>