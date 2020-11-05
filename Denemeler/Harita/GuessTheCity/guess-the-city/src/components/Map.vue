<template>
  <div id="container">

    <!--Popup result-->
    <v-dialog persistent v-model="popupResult" width="350" style="z-index: 2">
      <v-card>
        <v-card-title class="headline grey" style="justify-content: center">
          Result
        </v-card-title>

        <v-card-text class="mt-4" style="font-size: large">
          <div style="text-align: center">
            <span v-if="clickedCountry === ''">You failed to click in {{timeLimit / 1000}} seconds! =(</span>
            <span v-else>
              You clicked to:
              <br>
              <span style="font-weight: bolder">{{clickedCountry}}</span>.
                <br> <p></p>
              <span v-if="correctCountry === clickedCountry">And it is correct! =)</span>
              <span v-else>However the correct answer was: <br>
                <span style="font-weight: bolder">{{correctCountry}}</span> =(
              </span>
          </span>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!--TODO make it middle-->
          <v-btn color="primary" text v-on:click="generateRandomCountry">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Popup question-->
    <v-dialog persistent v-model="popupQuestion" width="350" style="z-index: 2" v-on:click:outside="gameTimeCounter">
      <v-card>
        <v-card-title class="headline grey" style="justify-content: center">
          Question
        </v-card-title>

        <v-card-text class="mt-4" style="font-size: large">
          <div style="text-align: center">
            Find:
            <br>
            <span style="font-weight: bolder">{{correctCountry}}</span>.
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--Loading bar-->
    <v-dialog persistent v-model="loading" width="200" style="z-index: 2; overflow: hidden">
      <v-progress-linear
          color="orange accent-4"
          indeterminate
          rounded
          height="12"
          class="ma-auto"
          background-color="#fff"
      ></v-progress-linear>
    </v-dialog>

    <!--Map-->
    <div id="mapContainer" style="height:100vh; z-index: 1">
      <!--Countdown-->
      <v-container v-model="popupCountdown" style="opacity: 1">
        <v-progress-linear
          absolute
          bottom
          persistent
          color="orange accent-4"
          height="20"
          class="ma-auto"
          background-color="#fff"
          v-bind:value="(valueCountdown / (timeLimit / 1000)) * 100"
        >
          <template>
            <strong>{{Math.ceil(valueCountdown)}}</strong>
          </template>
        </v-progress-linear>
      </v-container>
    </div>

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
        countryService: {
          url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0',
          simplifyFactor: 0.2,
          style: {weight: 0.5}
        },
        myMap: {},
        popupResult: false,
        popupQuestion: false,
        popupCountdown: false,
        correctCountry: "",
        clickedCountry: "",
        loading: false,
        timeLimit: 5000,
        valueCountdown: null
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
          url: this.countryService.url,
          simplifyFactor: this.countryService.simplifyFactor,
          style: this.countryService.style
        });

        this.countries.addTo(this.myMap);

        this.myMap.on("click", (e) => {
          this.clickCountry(e);
        })
      },

      zoomToCountry(country) {
        this.countries.query().where(`COUNTRY='${country}'`).run((error, featureCollection) => {
          const featureGeoJSON = L.geoJSON(featureCollection);
          this.myMap.fitBounds(featureGeoJSON.getBounds());
        });
      },

      clickCountry(e) {
        this.loading = true;
        this.countries.query()["intersects"](e.latlng).run((error, featureCollection) => {
          if (error) {
            console.log("no country")
            this.loading = false;
          } else {
            this.loading = false;
            this.clickedCountry = featureCollection.features[0].properties["COUNTRY"];
            if (this.clickedCountry) {
              this.popupResult = true;
            }
          }
        })
      },

      generateRandomCountry() {
        this.valueCountdown = this.timeLimit / 1000;
        this.loading = true;
        this.popupResult = false;
        const randomNumber = Math.ceil(Math.random() * 249);
        this.countries.query().where(`FID='${randomNumber}'`).run((error, featureCollection) => {
          if (featureCollection) {
            this.correctCountry = featureCollection.features[0].properties["COUNTRY"];
            this.popupQuestion = true;
          }
          this.loading = false;
        });
      },

      gameTimeCounter() {
        this.clickedCountry = "";
        this.popupQuestion = false;
        this.popupCountdown = true;

        const timer = () => {
          if (this.valueCountdown !== 1 && this.popupQuestion !== true && this.popupResult !== true) {
            console.log(this.valueCountdown, this.popupQuestion)
            this.valueCountdown -= 1;
          } else {
            this.popupCountdown = false;
            clearInterval(countdown);
          }
        }

        const countdown = setInterval(timer, 1000);

        // Game time limit
        setTimeout(() => {
          if (this.clickedCountry === "") {
            this.popupResult = true;
          }
        }, this.timeLimit)
      }
    },

    mounted() {
      this.initMap();
      this.generateRandomCountry()
      this.popupResult = false;
    }
  }
</script>

<style scoped>

</style>