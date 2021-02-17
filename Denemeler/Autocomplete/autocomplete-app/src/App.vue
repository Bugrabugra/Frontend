<template>
  <div id="app">
    <Autocomplete/>
  </div>
</template>

<script>
  import Autocomplete from "./components/Autocomplete";


  export default {
    name: 'App',
    components: {
      Autocomplete
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
