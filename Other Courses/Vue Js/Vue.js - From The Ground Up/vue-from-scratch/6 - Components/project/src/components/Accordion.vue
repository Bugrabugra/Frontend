<template>
  <div>
    <p>{{item.title}}</p>
    <p v-on:click="toggle = !toggle">Details</p>
    <p v-if="toggle">{{item.description}}</p>
  </div>
</template>

<script>
  export default {
    name: "Accordion",

    props: ["item"],

    data() {
      return {
        toggle: false,
      }
    }
  }
</script>

<style scoped>

</style>