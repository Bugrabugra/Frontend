<template>
  <nav class="main-nav">
    <router-link :to="{name: 'Home'}">Projects</router-link>
    <router-link :to="{name: 'AddProject'}">Add a new project</router-link>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .main-nav {
    text-align: center;
    margin: 40px auto;
  }
  .main-nav a{
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: #999;
    font-size: 18px;
  }

  a.router-link-active {
    border-bottom: 3px solid #00ce89;
    padding-bottom: 4px;
  }
</style>