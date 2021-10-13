<template>
  <button @click="show = true">Login</button>
  <AsyncPopup v-if="show"/>
</template>

<script setup>
  import {defineAsyncComponent} from "vue";
  import {ref} from "vue";
  import Loading from "./components/Loading.vue";
  import Error from "./components/Error.vue";


  // const LoginPopup = defineAsyncComponent(() => import("./components/LoginPopup.vue"))
  const show = ref(false);

  const AsyncPopup = defineAsyncComponent({
    loader: () => import("./components/LoginPopupWithAsyncSetup.vue"),
    loadingComponent: Loading,
    errorComponent: Error,
    delay: 1000,
    timeout: 3000
  });


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
