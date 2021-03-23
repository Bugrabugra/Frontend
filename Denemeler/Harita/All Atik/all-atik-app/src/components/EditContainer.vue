<template>
  <div>
    <q-btn
      v-show="!drawing"
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
  export default {
    name: "EditContainer",

    data() {
      return {
        drawing: false
      }
    },

    computed: {
      drawingManager() {
        return this.$store.getters.getDrawingManager
      },

      map() {
        return this.$store.getters.getMap;
      }
    },

    methods: {
      addContainer() {
        this.drawing = true;
        this.drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.MARKER);
      },

      cancelDrawing() {
        this.drawing = false;
        this.drawingManager.setDrawingMode(null);
      },

      initDrawingManager() {
        const _this = this;
        const containerID = parseInt(_this.$store.getters.getSettings.containerID);

        const drawingManager = new window.google.maps.drawing.DrawingManager({
          drawingControl: false,
          markerOptions: {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 0
            }
          },
          map: _this.$store.getters.getMap
        });

        _this.$store.dispatch("setDrawingManager", drawingManager);

        window.google.maps.event.addListener(_this.drawingManager, 'markercomplete', function(marker) {
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
      map() {
        this.initDrawingManager();
      }
    }
  }
</script>
