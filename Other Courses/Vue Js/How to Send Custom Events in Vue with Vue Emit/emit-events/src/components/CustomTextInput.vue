<template>
  <div>
    <p>Custom Text Input</p>
    <input
        type="text"
        placeholder="Custom Text Input"
        @change="changed"
    >
  </div>
</template>

<script setup>
  import {defineEmits} from "vue";

  const emit = defineEmits(["customChange"])
  const changed = (event) => {
    emit("customChange", event.target.value);
  }
</script>

<style scoped>

</style>