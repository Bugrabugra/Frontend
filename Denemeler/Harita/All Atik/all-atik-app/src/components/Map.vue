<template>
  <q-layout id="map">

  </q-layout>
</template>

<script>
  import {loadedGoogleMapsAPI} from "boot/google-map";
  import {api} from "boot/axios";
  import MarkerClusterer from '@googlemaps/markerclustererplus';


  export default {
    name: "Map",
    data() {
      return {
        map: null,
        drawingManager: null,
        markers: [],
        markerCluster: null
      }
    },

    computed: {
      filterChanged() {
        return this.$store.getters.filterChanged;
      }
    },

    methods: {
      initMap() {
        setTimeout(() => {
          this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: 40.98390570573965, lng: 29.13268504720865 },
            mapId: "b15068e07cf8d4c6",
          });

          // this.drawingManager = new window.google.maps.drawing.DrawingManager({
          //   drawingControl: true,
          //   drawingControlOptions: {
          //     position: window.google.maps.ControlPosition.BOTTOM_CENTER,
          //     drawingModes: [
          //       window.google.maps.drawing.OverlayType.POLYGON,
          //     ],
          //   },
          // });

          // this.drawingManager.setMap(this.map);

          // window.google.maps.event.addListener(this.drawingManager, 'polygoncomplete', function(polygon) {
          //   this.geometry = window.google.maps.geometry.encoding.encodePath(polygon.getPath());
          //   console.log(window.google.maps.geometry.encoding.encodePath(polygon.getPath()));
          // });
        }, 0)

        this.$store.dispatch("getContainers");
      },

      drawContainers() {
        if (this.markerCluster) {
          this.markerCluster.clearMarkers();
        }

        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

        this.markers = [];

        this.markers = this.$store.getters.getContainers.map(container => {
          const fullness = () => {
            if (container.fullness === null) {
              return "grey"
            } else if (container.fullness >= 0 && container.fullness <= 50) {
              return "#6aa454"
            } else if (container.fullness > 50 && container.fullness <= 75) {
              return "#fdc740"
            } else if (container.fullness > 75 && container.fullness <= 100) {
              return "#ef4343"
            }
          };

          const svgIconChooser = () => {
            if (container.typeID === 12715) {
              return "M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z"
            } else {
              return "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            }
          }

          const svgMarker = {
            path: svgIconChooser(),
            fillColor: fullness(),
            fillOpacity: 1,
            strokeWeight: 0.5,
            strokeColor: "#a0a0a0",
            rotation: 0,
            scale: 2.0,
            anchor: new window.google.maps.Point(0, 0),
          };

          const containerLatLng = {
            lat: container.latitude,
            lng: container.longitude
          };

          const marker = new window.google.maps.Marker({
            position: containerLatLng,
            title: container.containerName,
            icon: svgMarker,
            animation: window.google.maps.Animation.DROP,
            clickable: true,
            draggable: true
          });

          marker.setMap(this.map);

          marker.addListener("click", () => {
            this.$store.dispatch("getContainer", container);
          })

          marker.addListener("dragend", (evt) => {
            console.log(`Marker dropped: Current Lat: ' + ${evt.latLng.lat().toFixed(3)} + ' Current Lng: ' + ${evt.latLng.lng().toFixed(3)}`)
          })

          return marker;
        });

        this.markerCluster = new MarkerClusterer(this.map, this.markers, {
          imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        });

        this.$q.loading.hide();
        this.$store.dispatch("changeFilter", false);
      }
    },

    watch: {
      filterChanged() {
        if (this.filterChanged) {
          this.drawContainers();
        }
      }
    },

    mounted() {
      // Initializing the Google Maps API when the page is created
      loadedGoogleMapsAPI.then(() => {
        this.initMap();
      })
    }
  }
</script>

<style lang="sass" scoped>
  #map
    height: 100% !important
  html,
  body
    height: 100%
    margin: 0
    padding: 0
</style>
