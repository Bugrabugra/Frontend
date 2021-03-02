<template>
  <div>
    {{getters.counter}}
  </div>
</template>

<script>
  import {ref, computed} from "vue";
  import {mapGetters, mapActions, useStore} from "vuex"


  export default {
    name: 'Home',

    setup(props, {root}) {
      const store = useStore();

      const getters = mapGetters({
        counter: "counter"
      })

      console.log(getters)



      return {getters}
    }
  }
</script>
