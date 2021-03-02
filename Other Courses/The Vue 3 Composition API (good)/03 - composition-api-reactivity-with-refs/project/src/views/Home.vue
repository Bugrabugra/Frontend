<template>
  <div>
    {{number}} {{string}}
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: 'Home',

    setup() {
      const number = ref(0);
      const string = ref("abc")

      setInterval(() => {
        number.value++
      }, 1000)

      return {number, string}
    }
  }
</script>
