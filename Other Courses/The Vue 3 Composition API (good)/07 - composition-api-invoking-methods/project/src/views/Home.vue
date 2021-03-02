<template>
  <div>
    {{number}}

    <a href="" @click.prevent="increment">Increment</a>
    <a href="" @click.prevent="decrement">Decrement</a>
  </div>
</template>

<script>
  import {reactive, toRefs, ref} from "vue";
  import useNumbers from "./numbers";


  export default {
    name: 'Home',

    setup() {
      const number = ref(0);
      const {decrement, increment} = useNumbers(number)

      return {number, increment, decrement}
    }
  }
</script>