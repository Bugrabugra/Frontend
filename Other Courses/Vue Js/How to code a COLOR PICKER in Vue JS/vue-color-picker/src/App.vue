<template>
  <div id="app">
    <HeaderNav :color="color"/>
    <ColorPicker :colors="colors" @setColor="setColor"/>
    <ColorGrid :color="color"/>
  </div>
</template>

<script>
  import HeaderNav from "./components/HeaderNav";
  import ColorPicker from "./components/ColorPicker";
  import {ref} from "vue";
  import ColorGrid from "./components/ColorGrid";


  export default {
    name: 'App',
    components: {
      ColorGrid,
      ColorPicker,
      HeaderNav
    },
    setup() {
      const color = ref("#fff");
      const colors = ref(["#fff", "#000", "#af1e2d", "#00eeae", "#ffce00"])

      const setColor = (col) => {
        color.value = col;
        console.log(color.value)
      };

      return {color, colors, setColor}
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
