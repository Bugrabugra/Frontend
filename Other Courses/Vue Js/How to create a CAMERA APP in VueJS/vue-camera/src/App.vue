<template>
  <div id="app">
    <Camera @takePicture="takePicture"/>
    <Picture/>
  </div>
</template>

<script>
  import Camera from "./components/Camera";
  import Picture from "./components/Picture";


  export default {
    name: 'App',
    components: {
      Picture,
      Camera},
    setup() {
      // Methods
      const takePicture = () => {
        const ratio = (window.innerHeight < window.innerWidth) ? 16/9 : 9/16;
        const picture = document.querySelector("canvas");
        picture.width = (window.innerWidth < 1280) ? window.innerWidth : 1280;
        picture.height = window.innerWidth / ratio;
        const ctx = picture.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          document.querySelector("video"),
          0,
          0,
          picture.width,
          picture.height
        )
      };

      return {takePicture}
    }
  }
</script>

<style lang="scss">
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }
</style>
