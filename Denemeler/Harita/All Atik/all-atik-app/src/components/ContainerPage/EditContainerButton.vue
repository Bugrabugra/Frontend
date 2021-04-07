<template>
  <div>
    <q-btn
      v-show="!drawing"
      label="GEOMETRI OLUŞTURMA"
      @click="addContainer"
      color="green"
      class="q-ma-sm"
    >
      <q-icon name="add_location_alt"/>
    </q-btn>

    <q-btn
      v-show="drawing"
      label="İPTAL"
      @click="cancelDrawing"
      color="green"
      class="q-ma-sm"
    >
      <q-icon name="wrong_location"/>
    </q-btn>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "EditContainerButton",

    data() {
      return {
        drawing: false
      }
    },

    computed: {
      ...mapGetters([
        "getDrawingManager",
        "getMap",
        "getSettings"
      ])
    },

    methods: {
      addContainer() {
        this.drawing = true;
        this.getDrawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.MARKER);
      },

      cancelDrawing() {
        this.drawing = false;
        this.getDrawingManager.setDrawingMode(null);
      },

      initDrawingManager() {
        console.log(this.getSettings);
        const _this = this;
        const containerID = parseInt(this.getSettings.containerID);
        console.log(containerID);

        const drawingManager = new window.google.maps.drawing.DrawingManager({
          drawingControl: false,
          markerOptions: {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 0
            }
          },
          map: _this.getMap
        });

        this.$store.dispatch("setDrawingManager", drawingManager);

        window.google.maps.event.addListener(_this.getDrawingManager, 'markercomplete', function(marker) {
          const latitude = marker.getPosition().lat();
          const longitude = marker.getPosition().lng();

          _this.$store.dispatch(
            "addGeometry",
            {
              containerID: containerID,
              latitude: latitude,
              longitude: longitude
            }).then(() => {
              setTimeout(() => {
                _this.$store.dispatch("getContainers");
              }, 1000)
              _this.cancelDrawing();
          })
        });
      }
    },

    watch: {
      getMap() {
        this.initDrawingManager();
      }
    }
  }
</script>
