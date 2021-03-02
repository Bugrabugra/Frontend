<template>
  <div>
    {{number}}
  </div>
</template>

<script>
  import {ref, watchEffect, watch, reactive, toRefs} from "vue";


  export default {
    name: 'Home',

    setup() {
      const number = ref(0);

      const state = reactive({
        number: 0
      })

      setInterval(() => {
        state.number++;
      }, 1000)

      // watch(() => state.number, (number, previous) => {
      //   console.log("Changed", number, previous)
      // })

      watch(() => state, (state) => {
        console.log("Changed", state)
      }, {deep: true})

      return toRefs(state)
    }
  }
</script>
