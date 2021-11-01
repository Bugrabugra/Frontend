<template>
  <div>
    <MyButton :btn-text="text"/>
    <button @click="text = 'erik'">Press me</button>
  </div>
</template>

<script setup>
  import MyButton from "./components/MyButton.vue";
  import {ref} from "vue";

  const text = ref("Hi from data");
</script>

<style>
  #app {
    font-family: "Avenir LT Std", Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
</style>
