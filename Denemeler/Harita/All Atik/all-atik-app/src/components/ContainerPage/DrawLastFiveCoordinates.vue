<template>
  <div>
    <q-btn
      v-if="!isButtonClicked"
      :label="$t('pageContainer.buttonContainer.btnLastFiveContainers')"
      @click="showFiveCoordinates"
      color="blue-3"
      icon="my_location"
    />

    <q-btn
      v-if="isButtonClicked"
      :label="$t('pageContainer.buttonContainer.btnLastFiveContainersHide')"
      @click="hideFiveCoordinates"
      color="blue-3"
      icon="gps_off"
      outline
    />
  </div>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "DrawLastFiveCoordinates",

    data() {
      return {
        isButtonClicked: false
      }
    },

    computed: {
      ...mapGetters([
        "getCurrentContainer",
        "getArrayMarkerLastFiveCoordinates"
      ])
    },

    methods: {
      showFiveCoordinates() {
        this.isButtonClicked = true;
        this.$store.dispatch("setCurrentContainerLastFiveCoordinates", this.getCurrentContainer.id)
      },

      hideFiveCoordinates() {
        this.isButtonClicked = false;
        this.getArrayMarkerLastFiveCoordinates.forEach(marker => {
          marker.setMap(null);
        })
      }
    }
  }
</script>

<style scoped>

</style>
