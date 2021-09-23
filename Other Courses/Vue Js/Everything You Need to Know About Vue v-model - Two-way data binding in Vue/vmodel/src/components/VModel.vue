<template>
  <div>
    <!--<input type="text" v-model.trim="value"/>-->
    <!--<input type="text" v-model.lazy="value"/>-->
    <!--<input type="text" v-model.number="value"/>-->
    <p>Value: {{value}}</p>
  </div>
</template>

<script setup>
  import {ref} from "vue";


  const value = ref("")
</script>

<style scoped>

</style>