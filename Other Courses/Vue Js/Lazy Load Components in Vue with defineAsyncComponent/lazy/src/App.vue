<template>
  <button @click="show = true">Login</button>
  <Suspense v-if="show">
    <template #default>
      <AsyncPopup/>
    </template>
    <template #fallback>
      <Loading/>
    </template>
  </Suspense>
</template>

<script setup>
  import {defineAsyncComponent} from "vue";
  import {ref} from "vue";
  import Loading from "./components/Loading.vue";

  const AsyncPopup = defineAsyncComponent(
      () => import("./components/LoginPopupWithAsyncSetup.vue")
  );
  const show = ref(false);
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
