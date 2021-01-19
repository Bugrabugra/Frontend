<template>
  <v-app>
    <v-main>
      <div
          class="d-flex align-center mx-auto fill-height"
          :style="{width: '60%'}"
      >
        <Player/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import Player from "./components/Player";

  
  export default {
    name: "App",
  
    components: {
      Player
    },

    data() {
      return {
        value: 0.5
      }
    },

};
</script>
