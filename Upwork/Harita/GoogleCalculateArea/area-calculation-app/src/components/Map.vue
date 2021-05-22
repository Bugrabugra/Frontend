<template>
  <v-container fluid class="ma-0 pa-0" style="height: 100%;">
    <!--Map container-->
    <div id="map" style="height: 100% !important;"></div>

    <!--Welcome Popup-->
    <WelcomePopup/>

    <!--The dialog that appears when you complete a polygon-->
    <SaveAreaDialog/>

    <!--The dialog that appears when you press estimate button-->
    <SendReportDialog/>

    <!--Street view-->
    <StreetView
        v-if="$store.getters.getPanorama"
        :style="{
          position: 'absolute',
          top: '70px',
          left: '10px',
          width: isMini ? '300px' : '400px',
          height: isMini ? '200px' : '270px',
          zIndex: 2,
          border: '4px solid white'
        }"
    />

  </v-container>
</template>

<script>
  import SaveAreaDialog from "./SaveAreaDialog";
  import SendReportDialog from "./SendReportDialog";
  import {loadedGoogleMapsAPI} from "../main";
  import WelcomePopup from "./WelcomePopup";
  import StreetView from "./StreetView";
  import {mapGetters} from "vuex";


  export default {
    name: 'Map',

    components: {
      StreetView,
      WelcomePopup,
      SendReportDialog,
      SaveAreaDialog
    },

    data() {
      return {
        map: null,
      }
    },

    computed: {
      ...mapGetters(["isMini"])
    },

    mounted() {
      // Initializing the Google Maps API when the page is created
      loadedGoogleMapsAPI.then(() => {
        this.initMap();
      });
    },

    methods: {
      initMap() {
        const _this = this;
        setTimeout(() => {
          this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: { lat: 36.833, lng: -99.903 },
            // You can switch on Google Map types here
            mapTypeId: "satellite",
            // Disable yellow man (street view)
            streetViewControl: false,
            // Disable 45 degrees
            tilt: 0,
            rotateControl: false
          });

          this.$store.dispatch("setMap", this.map);

          const drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: false,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.BOTTOM_CENTER,
              drawingModes: [
                window.google.maps.drawing.OverlayType.POLYGON,
              ],
            },
            // Sketched polygons properties
            polygonOptions: {
              fillColor: "#bf2424",
              fillOpacity: 0.3,
              strokeColor: "#e02525",
              editable: true
            }
          });

          this.$store.dispatch("setDrawingManager", drawingManager);

          drawingManager.setMap(this.$store.state.map);

          // Stop drawing on right click
          _this.map.addListener('rightclick', (e) => {
            if (_this.$store.state.drawPolygon) {
              let zoom;
              let extent;
              zoom = _this.map.getZoom();
              extent = _this.map.getBounds();

              _this.$store.state.drawingManager.setDrawingMode(null);
              _this.map.setZoom(zoom);
              _this.map.panToBounds(extent);
              _this.$store.dispatch("startDraw");
              _this.$store.dispatch("showSaveAreaDialog", false);
            }
          });

          // Show dialog when drawing is finished
          window.google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            _this.$store.dispatch("showSaveAreaDialog", true);
            polygon.setMap(null);

            this.geometry = window.google.maps.geometry.encoding.encodePath(polygon.getPath());

            _this.$store.dispatch("setPolygonGeometry", this.geometry);

            let bounds = new window.google.maps.LatLngBounds;
            polygon.getPath().forEach(function(latLng) {
              bounds.extend(latLng);
            });

            _this.$store.state.map.fitBounds(bounds)

            // Finished polygons style property
            const featureStyling = function(feature) {
              return {
                fillColor: '#00cc00'
              };
            };

            _this.$store.state.map.data.setStyle(featureStyling);
          });
        }, 500)
      }
    }
  }
</script>