<template>
  <v-container class="ma-0 pa-0" style="height: 100%;">
    <div id="map" style="height: 100% !important;"></div>
    <SaveAreaDialog/>
    <SendReportDialog/>

  </v-container>
</template>

<script>
  import SaveAreaDialog from "./SaveAreaDialog";
  import SendReportDialog from "./SendReportDialog";
  import {loadedGoogleMapsAPI} from "../main";


  export default {
    name: 'Map',

    components: {
      SendReportDialog,
      SaveAreaDialog
    },

    data() {
      return {
        map: null,
      }
    },

    mounted() {
      loadedGoogleMapsAPI.then(()=>{
        this.initMap();
      });
    },

    methods: {
      initMap() {
        const _this = this;
        setTimeout(() => {
          this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: { lat: 24.886, lng: -70.268 },
            mapTypeId: "satellite",
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
            polygonOptions: {
              fillColor: "#bf2424",
              fillOpacity: 0.3,
              strokeColor: "#e02525"
            }
          });

          this.$store.dispatch("setDrawingManager", drawingManager);

          drawingManager.setMap(this.$store.state.map);

          // Star drawing
          window.google.maps.event.addDomListener(document.getElementById('draw'), 'click', function() {
            _this.$store.state.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
          });

          // Stop drawing
          window.google.maps.event.addDomListener(document.getElementById('not-draw'), 'click', function() {
            _this.$store.state.drawingManager.setDrawingMode(null);
          });

          // Stop drawing on right click
          _this.map.addListener('rightclick', function (e) {
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

            const featureStyling = function(feature) {
              return {
                fillColor: '#00cc00'
              };
            };

            _this.$store.state.map.data.setStyle(featureStyling);
          });
        }, 500)
      },
    }
  }
</script>