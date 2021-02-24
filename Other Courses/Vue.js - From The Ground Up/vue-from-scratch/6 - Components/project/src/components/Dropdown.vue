<template>
  <select name="dropdown" id="dropdown" v-on:change="optionChanged" v-model="selectedOption">
    <option value="null" disabled>Please select an option</option>
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </select>
</template>

<script>
  export default {
    name: "Dropdown",

    data() {
      return {
        selectedOption: null
      }
    },

    methods: {
      optionChanged(value) {
        this.$emit("eventUpdateOption", this.selectedOption);
      }
    }
  }
</script>

<style scoped>

</style>