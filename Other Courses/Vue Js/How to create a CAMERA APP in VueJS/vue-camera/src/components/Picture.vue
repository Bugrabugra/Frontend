<template>
  <div class="picture">
    <canvas></canvas>
  </div>
</template>

<script>
  export default {
    name: "Picture",

  }
</script>

<style lang="scss" scoped>
  .picture {
    display: block;
    width: 100vw;
    height: 100vh;
    padding: 25px;
    box-sizing: border-box;

    canvas {
      display: block;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      box-shadow: 4px 4px 12px 0 transparentize($color: #171717, $amount: 0.5);
    }
  }
</style>