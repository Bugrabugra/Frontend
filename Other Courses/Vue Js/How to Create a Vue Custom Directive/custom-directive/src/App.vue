<template>
  <p>Default Font Size</p>
  <p v-font-size="fontSize">Modified Font Size</p>
  <p v-font-size:small>Small</p>
  <p v-font-size:medium>Medium</p>
  <p v-font-size:large.veryLarge.red>Large</p>
  <button @click="fontSize *= 2">Bigger Font</button>
</template>

<script setup>
  import {ref} from "vue";

  const fontSize = ref(8);
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
</style>
