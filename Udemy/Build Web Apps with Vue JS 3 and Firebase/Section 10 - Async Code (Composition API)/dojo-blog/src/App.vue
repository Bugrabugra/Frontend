<template>
  <NavBar/>
  <router-view/>
</template>

<script>
  import NavBar from "./components/NavBar";
  export default {
    name: "App",
    components: {NavBar}
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
