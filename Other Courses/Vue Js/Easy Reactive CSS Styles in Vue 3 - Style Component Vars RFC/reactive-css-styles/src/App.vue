<template>
  <div>
    <p class="text">Hello World</p>
    <button @click="color = 'blue'">Make Blue</button>
    <button @click="font.size += 10">Increase Size</button>
    <button @click="font.size -= 10">Decrease Size</button>
  </div>

  <!--child components doesn't work-->
</template>

<script setup>
  import {computed, ref} from "vue";

  const color = ref("red");
  const font = ref({
    weight: 800,
    size: 40
  });

  const fontSize = computed(() => font.value.size + "px");
</script>

<style>
  .text {
    color: v-bind(color);
    font-weight: v-bind("font.weight");
    font-size: v-bind("fontSize");
  }
</style>
