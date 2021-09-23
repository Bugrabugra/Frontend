<template>
  <p>{{myValue}}</p>
  <p>{{myValue2}}</p>
</template>

<script setup>
  import {inject} from "vue";

  // it exists
  const myValue = inject("myValue", "another");
  // it doesn't exist
  const myValue2 = inject("myValue2", "another");
</script>