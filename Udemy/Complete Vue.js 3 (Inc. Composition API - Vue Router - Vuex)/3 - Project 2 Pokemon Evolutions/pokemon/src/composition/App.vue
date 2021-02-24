<template>
  <button @click="increment">{{count}}</button>
  <button @click="a++">{{a}}</button>
  <button @click="b++">{{b}}</button>
  <div v-for="msg in history">
    {{msg}}
  </div>
</template>

<script>
  import {useNumbers} from "./numbers";


  export default {
    name: "CompositionApi",

    created() {
      console.log("created");
    },

    mounted() {
      console.log("mounted");
    },

    setup() {
      const {history, increment, count, a, b} = useNumbers()

      return {
        history,
        increment,
        count,
        a,
        b
      }
    }
  }
</script>

<style scoped>

</style>