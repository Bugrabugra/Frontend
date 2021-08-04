<template>
  <div class="color-picker">
    <div
        class="color"
        v-for="(color, index) in colors"
        :key="index"
        :style="'background-color:' + color"
        @click="setColor(color)"
    >

    </div>
  </div>
</template>

<script>
  export default {
    name: "ColorPicker",
    props: ["colors"],
    setup(_, {emit}) {

      const setColor = (color) => {
        emit("setColor", color);
      };

      return {setColor}
    }
  }
</script>

<style lang="scss">
  .color-picker {
    display: grid;
    width: 125px;
    margin: 15px auto;
    grid-template-columns: repeat(5, 25px);

    .color {
      border: 1px solid #aaa;
      height: 25px;
      cursor: pointer;
    }
  }
</style>