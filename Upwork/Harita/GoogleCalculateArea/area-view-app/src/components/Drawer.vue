<template>
  <v-navigation-drawer permanent app class="light-green darken-1">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col>
          <!--Text area-->
          <ParserTextArea/>
        </v-col>
      </v-row>

      <!--Total area-->
      <h4 v-if="totalArea" class="font-weight-medium my-3"><v-icon>mdi-sigma</v-icon>Total: {{totalArea}} ft²</h4>

      <!--Not array error-->
      <h4 v-if="error" class="red--text font-weight-medium my-3">{{error}}</h4>

      <v-row justify="center" align="center">
        <v-col >
          <!--Parse button-->
          <v-btn style="width: 100%" color="#173c00" @click="parseURL" :disabled="viewed" dark>View</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-navigation-drawer>
</template>

<script>
  import ParserTextArea from "./ParserTextArea";
  const convert = require('convert-units');


  export default {
    name: "Drawer",

    components: {
      ParserTextArea,
    },

    data() {
      return {
        totalArea: null,
        viewed: false,
        buttonName: "",
        error: ""
      }
    },

    methods: {
      parseURL() {
        if (this.$store.state.data) {
          if (!this.viewed) {

            try {
              const decodedURL = JSON.parse(decodeURIComponent(this.$store.state.data));

              if (!Array.isArray(JSON.parse(decodeURIComponent(this.$store.state.data)))) {
                console.log("error")
                this.error = "It is not an array!"
                return
              }

              decodedURL.forEach(polygon => {
                const decodedGeometry = window.google.maps.geometry.encoding.decodePath(polygon.geometry);

                // Viewing the parsed polygons
                const poly = new window.google.maps.Polygon({
                  paths: decodedGeometry,
                  strokeColor: "#f5f104",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#e58109",
                  fillOpacity: 0.35,
                  label: polygon.name
                });

                poly.setMap(this.$store.state.map);

                let bounds = new window.google.maps.LatLngBounds;
                decodedGeometry.forEach(function(latLng) {
                  bounds.extend(latLng);
                });

                this.$store.state.map.fitBounds(bounds);

                const area = window.google.maps.geometry.spherical.computeArea(decodedGeometry);
                const roundedSquareFeetArea = convert(area).from("m2").to("ft2").toFixed(0);

                this.totalArea += parseInt(roundedSquareFeetArea);

                // Mouse over info bubble
                const infoWindow = new google.maps.InfoWindow();

                // Mouse over highlight property
                window.google.maps.event.addListener(poly, 'mouseover', (e) => {
                  poly.setOptions({fillColor: "#00FF00"});
                  infoWindow.setContent(`${polygon.name} - ${roundedSquareFeetArea} ft²`);
                  const latLng = e.latLng;
                  infoWindow.setPosition(latLng);
                  infoWindow.open(this.$store.state.map);
                });

                // Mouse out highlight property
                window.google.maps.event.addListener(poly, 'mouseout', (e) => {
                  poly.setOptions({fillColor: "#e58109"});
                  infoWindow.setPosition(null);
                });
              })

              // If the link was parsed once, it disables the button
              this.viewed = true;
              this.error = "";

            } catch (e) {
              this.error = e.message;
            }




          } else {

          }
        }
      }
    }
  }
</script>

<style scoped>
  .drawer {
    background-color: rgb(139, 180, 91);
  }
</style>