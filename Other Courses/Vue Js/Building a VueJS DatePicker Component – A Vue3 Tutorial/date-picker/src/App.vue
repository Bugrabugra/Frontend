<template>
  <p>Value: {{date}}</p>
  <DatePicker @update="date = $event"/>
</template>

<script setup>
  import {ref} from "vue";
  import DatePicker from "./components/DatePicker.vue";


  const date = ref(null);
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
