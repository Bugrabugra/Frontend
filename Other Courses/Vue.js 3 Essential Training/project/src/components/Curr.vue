<template>
  {{dollar}}
</template>

<script>
  export default {
    name: "Curr",

    props: ["amt"],

    computed: {
      dollar() {
        return "$" + Number.parseFloat(this.amt).toFixed(2);
      }
    }
  }
</script>

<style scoped>

</style>