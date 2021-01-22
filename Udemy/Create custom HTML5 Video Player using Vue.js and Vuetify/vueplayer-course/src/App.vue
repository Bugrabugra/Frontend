<template>
  <v-app>
    <v-main>
      <div
          class="d-flex align-center mx-auto fill-height"
          :style="{width: '60%'}"
      >
        <Player :source="{src, type: 'video/mp4'}"/>
        <button @click="src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'">
          Change Source
        </button>
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
        src: require("@/assets/video.mp4")
      }
    },

};
</script>
