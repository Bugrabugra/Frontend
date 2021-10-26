<template>
  <div class="app">
    <h4>Parent Component</h4>

    <h5 class="text-xl">Counter: {{counter}}</h5>

    <button
        @click="bgColor = 'bg-red-300'"
        class="text-red-200 bg-red-500 rounded p-2 mr-4 mt-5 focus:outline-none"
    >
      Make Box Red
    </button>

    <button
        @click="bgColor = 'bg-green-300'"
        class="text-green-200 bg-green-500 rounded p-2 mr-4 mt-5 focus:outline-none"
    >
      Make Box Green
    </button>

    <SuperComponent id="12" :class="bgColor" @click="test"/>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import SuperComponent from "./components/SuperComponent.vue";

  const counter = ref(0);
  const bgColor = ref("");

  const test = () => {
    counter.value = counter.value + 1;
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
  }
</style>