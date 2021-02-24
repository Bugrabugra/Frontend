<template>
  <div>
    <p v-text="dropdownResult"></p>
    <dropdown v-on:eventUpdateOption="optionUpdate"></dropdown>
  </div>
</template>

<script>
  import Dropdown from "./Dropdown";


  export default {
    name: "List",

    components: {
      "Dropdown": Dropdown
    },

    data() {
      return {
        dropdownResult: ""
      }
    },

    methods: {
      optionUpdate(value) {
        this.dropdownResult = value;
      }
    }
  }
</script>

<style scoped>

</style>