<template>
  <button @click="logout">Logout</button>

  <!--featuredLink comes from our mixin-->
  <a :href="featuredLink">Featured Link</a>

  <p v-font-size:small>Small</p>
  <p v-font-size:medium>Medium</p>
  <p v-font-size:large>Large</p>
  <MyHeader>
    <template #title>
      Building Your Own Vue 3 Plugin - <i> A Full Guide </i>
    </template>

    <template #author>
      Matt Daemon
    </template>
  </MyHeader>
</template>

<script setup>
  import MyHeader from "./components/MyHeader.vue";
  import {inject} from "vue";

  const logout = inject("logout");
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
