<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";


export default {
  name: 'App',
  components: {
    "Navbar": Navbar
  }
}
</script>

<style>
  body {
    background: #ddd;
  }
</style>
