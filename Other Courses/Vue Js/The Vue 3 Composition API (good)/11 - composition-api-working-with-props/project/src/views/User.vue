<template>
  <div>
    {{user.name}} {{formattedPoints}}
  </div>
</template>

<script>
  import numeral from "numeral";
  import {ref, computed} from "vue";


  export default {
    name: "User",

    props: {
      user: {
        required: true,
        type: Object
      }
    },

    setup(props) {
      const formattedPoints = computed(() => {
        return numeral(props.user.points).format("0,0");
      })

      return {formattedPoints}
    }
  }
</script>

<style scoped>

</style>