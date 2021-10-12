<template>
  <button @click="comp = ComponentA">
    ComponentA
  </button>

  <button @click="comp = ComponentB">
    ComponentB
  </button>

  <component :is="comp"/>

</template>

<script setup>
  import {ref} from "vue";
  import ComponentA from "./components/ComponentA.vue";
  import ComponentB from "./components/ComponentB.vue";

  const comp = ref(ComponentA);

  // export default {
  //   components: {ComponentA, ComponentB},
  //   data() {
  //     return {
  //       comp: "ComponentA"
  //     }
  //   }
  // }
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
