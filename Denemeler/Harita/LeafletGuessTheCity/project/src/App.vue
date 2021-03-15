<template>
  <v-app>
    <RulesDialog style="z-index: 2"/>
    <CityPanel/>
    <Map/>
  </v-app>
</template>

<script>
  import L from "leaflet"
  import cities from "../data/il";
  import RulesDialog from "./components/RulesDialog";
  import Countdown from "./components/Countdown";
  import CityPanel from "./components/CityPanel";
  import Map from "./components/Map";


  export default {
    name: 'App',

    components: {
      Map,
      CityPanel,
      RulesDialog
    },

    data: () => ({
      map: null,
      ruleDialog: false,
      cities: cities,
      width: 0,
      score: 0
    }),

    methods: {
      initiateMap() {
        this.map = L.map('map', { zoomControl: false }).setView([36, 35.319482], 6);

        L.geoJSON(cities, {
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
              },
              mouseout: () => {
                layer.setStyle({
                  fillColor: "rgb(27,114,144)",
                })
              },
              click: (e) => {
                if (this.$store.getters.gameStarted) {
                  this.$store.dispatch("guessedCity", e.target.feature.properties.NAME);

                  if (this.$store.getters.correctCity === this.$store.getters.guessedCity) {
                    this.$store.dispatch("result", "Doğru!");
                    this.$store.dispatch("addScore");
                    this.$store.dispatch("correctCity");
                    this.$store.dispatch("gameStarted", true);
                  } else {
                    this.$store.dispatch("result", "Yanlış!");
                    this.$store.dispatch("gameStarted", false);
                  }
                }
              }
            })
        })
        }).addTo(this.map);

        setTimeout(() => {
          this.$store.dispatch("showRuleDialog", true);
        }, 0)
      },
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
    height: 100%;
  }
  .map-background {
    background: linear-gradient(to left, #0f2027, #203a43, #2c5364);
  }
</style>
