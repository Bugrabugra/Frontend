<template>
  <div class="row">
    <q-btn
      v-show="!drawing"
      @click="drawZone"
      id="draw-zone"
      icon="edit"
      color="cyan-4"
      class="q-ma-xs"
    >
      EKLE - DÜZENLE
    </q-btn>

    <q-btn
      v-show="drawing"
      @click="cancelDrawZone"
      id="cancel-draw-zone"
      icon="edit"
      color="cyan-4"
      class="q-ma-xs"
    >
      İPTAL
    </q-btn>

    <q-btn
      @click="deleteZone"
      icon="clear"
      color="red"
      class="q-ma-xs"
    >
      SİL
    </q-btn>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {Dialog} from "quasar";
  import {i18n} from "boot/i18n";


  export default {
    name: "EditZoneButtons",

    data() {
      return {
        drawing: false,
        drawingManager: null
      }
    },

    computed: {
      ...mapGetters(["getMap", "getSettings"])
    },

    methods: {
      initDrawing() {
        const _this = this;

        this.drawingManager = new window.google.maps.drawing.DrawingManager({
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

        this.drawingManager.setMap(_this.getMap);

        // Start drawing
        window.google.maps.event.addDomListener(document.getElementById('draw-zone'), 'click', function() {
          _this.drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
          _this.drawZone();
        });

        // Stop drawing
        window.google.maps.event.addDomListener(document.getElementById('cancel-draw-zone'), 'click', function() {
          _this.drawingManager.setDrawingMode(null);
          _this.cancelDrawZone();
        });

        // Stop drawing on right click TODO
        _this.getMap.addListener('rightclick', (e) => {
          if (_this.drawing) {
            _this.drawingManager.setDrawingMode(null);
            _this.drawing = false;
          }
        });

        window.google.maps.event.addListener(_this.drawingManager, 'polygoncomplete', function(polygon) {
          polygon.setMap(_this.getMap);

          const geometry = window.google.maps.geometry.encoding.encodePath(polygon.getPath());

          _this.$store.dispatch("setZoneGeometry", {zoneID: _this.getSettings.zoneID, geometry: geometry})
            .then(() => {
              _this.$store.dispatch("drawZones");
              _this.drawingManager.setDrawingMode(null);
              _this.drawing = false;
              polygon.setMap(null);
            })

          let bounds = new window.google.maps.LatLngBounds;
          polygon.getPath().forEach(function(latLng) {
            bounds.extend(latLng);
          });

          _this.getMap.fitBounds(bounds);
        });
      },

      drawZone() {
        this.drawing = true;
      },

      cancelDrawZone() {
        this.drawing = false;
      },

      deleteZone() {
        this.$q.dialog({
          title: i18n.t("notifications.lblWarning"),
          ok: {
            label: i18n.t("notifications.btnOK"),
          },
          message: `ID: ${this.getSettings.zoneID} silmek istediğinize emin misiniz?`,
        }).onOk(() => {
          this.$store.dispatch("setZoneGeometry", {zoneID: this.getSettings.zoneID, geometry: ""})
            .then(() => {
              this.$store.dispatch("drawZones");
            })
        })

      }
    },

    watch: {
      getMap() {
        console.log("map loaded")
        this.initDrawing();
      }
    }
  }
</script>
