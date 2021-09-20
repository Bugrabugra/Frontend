<template>
  <div id="app">
    {{ count }}
    <button @click="increment()">Press Me</button>
  </div>
</template>

<script>
  import global from './composables/global.js'
  import {getCurrentInstance, toRefs} from 'vue';


  export default {
    name: 'App',
    setup() {

      const internalInstance = getCurrentInstance();
      const {state, increment} = global;
      increment();
      console.log(internalInstance);

      return {
        ...toRefs(state),
        increment
      };

    },
  }
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