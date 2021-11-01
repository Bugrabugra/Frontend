<template>
  <div>
    <button>{{fullText}}</button>
  </div>
</template>

<script setup>
  import {computed} from "vue";


  const props = defineProps({
    btnText: {
      type: String,
      required: true,
      default: "Default button"
    }
  });
  const fullText = computed(() => {
    return props.btnText + " Full Text";
  });
</script>

<style scoped>
  button {
    background-color: aquamarine;
    font-size: 60px;
    border-radius: 20px;
    padding: 10px;
    color: #000;
  }
</style>