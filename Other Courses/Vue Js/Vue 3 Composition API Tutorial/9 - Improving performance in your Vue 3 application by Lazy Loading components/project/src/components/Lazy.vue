<template>
  <h3 v-for="d in data">{{d}}</h3>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Lazy",

    setup() {
      const data = ref([]);

      setTimeout(() => {
        data.value = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }, 3000)

      return {data}
    }
  }
</script>

<style scoped>

</style>