<template>
  <div class="h-42 w-64 shadow-xl m-auto mt-12 rounded p-2">
    <h3>Super Component Info</h3>
    <div class="flex flex-col mt-5">
      <label for="box" class="text-xs">Random Label</label>
      <input type="text" id="box">
    </div>

    <button v-bind="filtered" class="border-black rounded-lg p-2 mt-5 focus:outline-none text-black">
      Press Me
    </button>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false
  }
</script>

<script setup>
  import {computed, useAttrs} from "vue";

  const attrs = useAttrs();
  console.log(attrs)

  const filtered = computed(() => {
    const newAttrs = {...attrs};
    delete newAttrs.class;
    return newAttrs;
  });
</script>

<style scoped>

</style>