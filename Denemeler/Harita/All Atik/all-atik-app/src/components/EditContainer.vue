<template>
  <div>
    <q-btn
      v-show="!drawing"
      @click="addContainer"
      :color="$store.getters.getContainer ? 'grey' : 'green'"
      :disable="$store.getters.getContainer !== null"
      class="q-ma-sm"
      id="draw"
    >
      <q-icon name="add_circle"/>
    </q-btn>

    <q-btn
      v-show="drawing"
      label="Çizimi iptal et"
      @click="drawing = !drawing"
      color="green"
      class="q-ma-sm"
      id="not-draw"
    >
      <q-icon name="add_circle"/>
    </q-btn>

    <q-btn
      @click="editContainer"
      :color="$store.getters.getContainer ? 'orange' : 'grey'"
      :disable="$store.getters.getContainer === null"
      class="q-ma-sm"
    >
      <q-icon name="edit"/>
    </q-btn>

    <q-btn
      @click="removeContainer"
      :color="$store.getters.getContainer ? 'red' : 'grey'"
      :disable="$store.getters.getContainer === null"
      class="q-ma-sm"
    >
      <q-icon name="remove_circle"/>
    </q-btn>
  </div>

</template>

<script>
  export default {
    name: "EditContainer",

    data() {
      return {
        drawingManager: null,
        drawing: false
      }
    },

    methods: {
      addContainer() {
        this.drawing = true;

        const containerID = this.$store.getters.getSettings.containerID;

        window.google.maps.event.addListener(this.drawingManager, 'markercomplete', function(marker) {
          console.log(marker);
        });

        // this.$store.dispatch(
        //   "updateGeometry",
        //   {
        //     containerID: containerID,
        //     latitude: null,
        //     longitude: null
        //   })
      },

      editContainer() {

      },

      removeContainer() {

      }
    },

    mounted() {
      this.drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingControl: false,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.BOTTOM_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.MARKER,
          ],
        },
        // Sketched polygons properties
        markerOptions: {
          fillColor: "#bf2424",
          fillOpacity: 0.3,
          strokeColor: "#e02525",
          editable: true
        }
      });

      // this.$store.dispatch("setDrawingManager", drawingManager);

      this.drawingManager.setMap(this.$store.getters.getMap);

      // Start drawing
      window.google.maps.event.addDomListener(document.getElementById('draw'), 'click', function() {
        // TODO burayı düzelt
        this.drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.MARKER);
      });

      // Stop drawing
      window.google.maps.event.addDomListener(document.getElementById('not-draw'), 'click', function() {
        this.drawingManager.setDrawingMode(null);
      });
    }

  }
</script>

<style scoped>

</style>
