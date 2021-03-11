<template>
  <v-app style="min-width: 800px">
    <v-main>
      <v-card
          color="red lighten-2"
          :width="500"
          :height="120"
          style="
          position:absolute;
          top: 150px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 1;"
      >
        <v-container>
          <v-row no-gutters align="center">
            <v-col cols="3">
              <v-btn :disabled="gameIsOn" @click="startGame">Başla</v-btn>
            </v-col>

            <v-col cols="9">
              Oyuna başlamak için düğmeye basınız.
              5 saniyede bir yeni bir şehir sorulacaktır.
              Doğru şehrin üzerine tıklayınız.
              Doğru bildiğiniz sürece oyun devam edecektir.
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-sheet
          style="position:relative;"
          height="100vh"
          id="map"
          class="map-background"
      />
    </v-main>
  </v-app>
</template>

<script>
  import city from "../data/il"
  import L from "leaflet"
  import cities from "../data/il";


  export default {
    name: 'App',

    data: () => ({
      map: null,
      gameIsOn: false,
      countdown: 5,
      cities: city,
      guessingCity: ""
    }),

    methods: {
      initiateMap() {
        this.map = L.map('map').setView([39, 35.319482], 6);

        L.geoJSON(city, {
          style: function (feature) {
            return {
              color: "rgb(56,161,193)",
              fillColor: "rgb(27,114,144)",
              opacity: 1,
            };
          },
          onEachFeature: ((feature, layer) => {
            layer.on({
              mouseover: (e) => {
                layer.setStyle({
                  fillColor: "#ffe601",
                  opacity: 1
                })
                console.log(e.target.feature.properties.NAME)
              },
              mouseout: () => {
                layer.setStyle({
                  fillColor: "rgb(27,114,144)",
                })
              },
              click: (e) => {
                console.log(e.target.feature.properties.NAME)
              }
            })
        })
        }).addTo(this.map);
      },

      startGame() {
        // this.gameIsOn = true;
        this.cityRandomer();
      },

      cityRandomer() {
        const randomNumber = Math.floor(Math.random() * 82);
        this.guessingCity = this.cities.features[randomNumber]["properties"]["NAME"];
        console.log(this.guessingCity)
      }
    },

    mounted() {
      this.initiateMap();
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }
  #map {
    height: 800px;
  }
  .map-background {
    background: linear-gradient(to left, #0f2027, #203a43, #2c5364);
  }
</style>
