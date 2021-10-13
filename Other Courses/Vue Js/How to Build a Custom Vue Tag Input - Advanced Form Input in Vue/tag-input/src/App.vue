<template>
  <p class="header">Tag Input</p>
  <TagInput/>
</template>

<script setup>
  import TagInput from "./components/TagInput.vue";
</script>

<style>
  #app {
    font-family: "Avenir LT Std", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .header {
    font-size: 3em;
  }
</style>
