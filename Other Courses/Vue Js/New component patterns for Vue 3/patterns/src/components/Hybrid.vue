<template>
  <div>
    <Count :count="count"/>
    <!--<p>{{count}}</p>-->
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
  import useAutoCount from "../composables/useAutoCount";
  import Count from "./Count";


  export default {
    name: "Hybrid",
    components: {Count},
    setup() {
      const {count} = useAutoCount(10);

      return {count}
    },
    methods: {
      reset() {
        this.count = 0;
      }
    }
  }
</script>

<style scoped>

</style>