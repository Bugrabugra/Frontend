<template>
  <div>
    <label>First Name</label>
    <input
        type="text"
        placeholder="Input"
        :value="valFirstName"
        @input="$emit('update:valFirstName', $event.target.value)"
    >
  </div>

  <div>
    <label>Last Name</label>
    <input
        type="text"
        placeholder="Input"
        :value="valLastName"
        @input="$emit('update:valLastName', $event.target.value)"
    >
  </div>
</template>

<script setup>
  import {defineProps} from "vue";

  const props = defineProps({
    valFirstName: String,
    valLastName: String
  });

</script>

<style scoped>

</style>