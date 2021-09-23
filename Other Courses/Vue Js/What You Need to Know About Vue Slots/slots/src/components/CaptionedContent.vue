<template>
  <div>
    <slot name="content">
      <img src="https://via.placeholder.com/640x360" alt="pic">
    </slot>
    <p>
      <slot name="caption" :source="source">Caption</slot>
    </p>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const source = ref("learnvue.co");
</script>

<style scoped>

</style>