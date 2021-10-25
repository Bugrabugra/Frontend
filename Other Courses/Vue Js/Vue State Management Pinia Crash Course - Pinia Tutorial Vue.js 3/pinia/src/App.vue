<template>
  <h3>Hello World {{name}}</h3>
  <h4>{{counter}}</h4>
  <h4>{{doubleCount}}</h4>
  <button @click="add(15)">Click me</button>
  <button @click="reset">Reset store</button>
  <button @click="clear">Clear</button>
</template>

<script setup lang="ts">
  import {storeToRefs} from "pinia";
  import {useCounterStore} from "./store/useCounter";


  const main = useCounterStore();

  const {counter, name, doubleCount} = storeToRefs(main);
  const {addOne} = main; // addOne

  const add = (value: number) => {
    main.$patch(state => (state.counter += value));
  };

  // resets the whole store
  const reset = () => {
    main.$reset()
  }

  main.$subscribe((mutation, state) => {
    console.log("mutation", mutation);
    console.log("state", state);
  });

  const clear = () => {
    main.$state = {counter: 123, name: "bob"};
  };
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
