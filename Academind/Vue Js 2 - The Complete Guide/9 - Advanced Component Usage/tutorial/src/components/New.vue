<template>
  <div>
    <h3>New Quote</h3>
    <button v-on:click="counter++">Increase!</button>
    <p>{{counter}}</p>
  </div>
</template>

<script>
  export default {
    name: "New",

    data() {
      return {
        counter: 0
      }
    },

    deactivated() {
      console.log("Deactivated");
    },

    activated() {
      console.log("Activated");
    }
  }
</script>

<style scoped>

</style>