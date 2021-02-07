<template>
  <v-textarea
      background-color="white"
      name="input-7-4"
      label="Please paste the URL here"
      v-model="data"
      hide-details
      outlined
  ></v-textarea>
</template>

<script>
  export default {
    name: "TextArea",

    data() {
      return {
        data: ""
      }
    },

    watch: {
      data() {
        this.$store.dispatch("updateData", this.data);
      }
    }
  }
</script>

<style scoped>

</style>