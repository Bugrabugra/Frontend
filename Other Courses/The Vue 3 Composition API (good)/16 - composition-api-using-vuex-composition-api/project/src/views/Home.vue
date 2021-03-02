<template>
  <div>
    {{counter}}
    <a href="" @click.prevent="increment(1)">Increment</a>
  </div>
</template>

<script>
  import {ref, computed} from "vue";
  import {mapGetters, mapActions, useStore} from "vuex"


  export default {
    name: 'Home',

    setup(props, {root}) {
      const store = useStore();

      const counter = computed(() => {
        return store.getters.counter
      })

      const increment = (value) => {
        store.dispatch("incrementCounter", value)
      }

      return {counter, increment}
    }
  }
</script>
