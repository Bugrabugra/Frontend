<template>
  <q-btn
    label="SON 5 KOORDİNAT ÖLÇÜMÜ"
    @click="five"
    color="orange"
    class="q-ma-sm"
    icon="my_location"
  />
</template>

<script>
  import {mapActions, mapGetters} from "vuex";


  export default {
    name: "DrawLastFiveCoordinates",

    computed: {
      ...mapGetters([
        "getCurrentContainer"
      ])
    },

    methods: {
      // ...mapActions([
      //   "setCurrentContainerLastFiveCoordinates"
      // ])
      five() {
        console.log(this.getCurrentContainer)
        this.$store.dispatch("setCurrentContainerLastFiveCoordinates", this.getCurrentContainer.id)
      }
    }
  }
</script>

<style scoped>

</style>
