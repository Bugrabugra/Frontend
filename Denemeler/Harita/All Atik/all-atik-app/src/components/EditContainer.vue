<template>
  <div>
    <q-btn
      @click="addContainer"
      :color="$store.getters.getContainer ? 'grey' : 'green'"
      :disable="$store.getters.getContainer !== null"
      class="q-ma-sm"
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
        drawingManager: null
      }
    },

    methods: {
      addContainer() {
        const containerID = this.$store.getters.getSettings.containerID;

        this.drawingManager = new window.google.maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.BOTTOM_CENTER,
            drawingModes: [
              window.google.maps.drawing.OverlayType.POLYGON,
            ],
          },
        });

        this.drawingManager.setMap(this.$store.getters.getMap);

        window.google.maps.event.addListener(this.drawingManager, 'markercomplete', function(marker) {
          console.log(marker);
        });

        this.$store.dispatch(
          "updateGeometry",
          {
            containerID: containerID,
            latitude: null,
            longitude: null
          })
      },

      editContainer() {

      },

      removeContainer() {

      }
    }

  }
</script>

<style scoped>

</style>
