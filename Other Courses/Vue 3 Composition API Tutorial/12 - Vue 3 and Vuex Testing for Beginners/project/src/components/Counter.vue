<template>
  <h4>{{count}}</h4>
  <button class="btn btn-primary" @click="inc">
    Increment (local)
  </button>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Counter",

    props: {
      by: {
        type: Number, default: 1
      }
    },

    setup(props) {
      const count = ref(0);
      const inc = () => {
        return count.value += props.by;
      }

      return {count, inc}
    }
  }
</script>

<style scoped>

</style>