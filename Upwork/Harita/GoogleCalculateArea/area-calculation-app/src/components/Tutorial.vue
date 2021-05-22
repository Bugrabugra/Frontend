<template>
  <v-card color="white" :class="isMini ? 'ma-0' : 'ma-3'">
    <div class="ma-2">
      Now it is time to draw your lawn area(s) on map!<br>
      1. Tap on the <b>"Draw New Area"</b> button.<br>
      2. Tap on the map where you want the corner of your first area to be located.<br>
      3. Keep tapping each corner to outline the area, then tap the original corner to finish.<br>
      4. Give your area a name, using labels <b>"Left"</b> or <b>"Right"</b> as if you were facing your front door.<br>
      5. Add more area as needed. When finished tap <b>"Request Estimate"</b> button.<br>
    </div>
  </v-card>

</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "Tutorial",

    computed: {
      ...mapGetters(["isMini"])
    }

  }
</script>

<style scoped>

</style>