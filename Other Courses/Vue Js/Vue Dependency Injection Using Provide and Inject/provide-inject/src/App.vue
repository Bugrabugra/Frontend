<template>
  <ChildComponent/>
</template>

<script setup>
  import ChildComponent from "./components/ChildComponent.vue";
  import {provide, ref} from "vue";

  const myValue = ref("test")

  provide("myValue", myValue);
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
