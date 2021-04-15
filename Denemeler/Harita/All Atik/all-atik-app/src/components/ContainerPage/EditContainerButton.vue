<template>
  <div>
    <q-btn
      v-show="!isButtonClicked"
      :label="$t('pageContainer.buttonContainer.btnGeometry')"
      @click="addContainer"
      color="brown-3"
      icon="add_location_alt"
      style="width: 188px"
    />

    <q-btn
      v-show="isButtonClicked"
      :label="$t('pageContainer.buttonContainer.btnGeometryCancel')"
      @click="cancelDrawing"
      color="brown-3"
      icon="wrong_location"
      style="width: 188px"
      outline
    />
  </div>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "EditContainerButton",

    data() {
      return {
        isButtonClicked: false
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
        this.isButtonClicked = true;
        this.getDrawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.MARKER);
      },

      cancelDrawing() {
        this.isButtonClicked = false;
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
