<template>
  <v-app>
    <v-main>
      <div
          class="d-flex align-center mx-auto fill-height"
          :style="{width: '60%'}"
      >
        <!--<Player/>-->
        <Slider v-model="value"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  // import Player from "./components/Player";
  import Slider from "./components/Slider/Slider";
  
  export default {
    name: "App",
  
    components: {
      Slider,
      // Player
    },

    data() {
      return {
        value: 0.5
      }
    },

};
</script>
