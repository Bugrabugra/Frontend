<template>
  <div>
    <h2>{{title}}</h2>
    <p>{{msg}}</p>
    <button @click="emit('close')">
      Close
    </button>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits} from "vue";

  defineProps({
    title: String,
    msg: String
  });

  const emit = defineEmits("close")
</script>

<style scoped>

</style>