<template>
  <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
  >
    <Drawer class="absolute left-0 top-20 bottom-0 z-30" v-if="isMenuOpen"/>
  </transition>
  <TheMap class="relative" @isMenuOpen="toggleMenu"/>
</template>

<script setup>
  import TheMap from "./components/TheMap.vue";
  import Drawer from "./components/Drawer.vue";
  import {ref} from "vue";


  const isMenuOpen = ref(null);

  const toggleMenu = (payload) => {
    isMenuOpen.value = payload;
  };
</script>

<style>
  html, body {
    height: 100%;
    margin: 0 auto;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
