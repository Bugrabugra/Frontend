<template>
  <CustomTextInput @customChange="logChange"/>
</template>

<script setup>
  import CustomTextInput from "./components/CustomTextInput.vue";

  const logChange = (event) => {
    console.log(event);
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
