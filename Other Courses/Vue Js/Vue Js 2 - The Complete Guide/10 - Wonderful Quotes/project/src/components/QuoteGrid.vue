<template>
  <div class="row">
    <Quote v-for="(quote, index) in quotes" v-bind:key="index" v-on:click.native="deleteQuote(index)">{{quote}}</Quote>
  </div>
</template>

<script>
  import Quote from "./Quote";


  export default {
    name: "QuoteGrid",

    props: ["quotes"],

    components: {
      Quote: Quote
    },

    methods: {
      deleteQuote(index) {
        this.$emit("quoteDeleted", index);
      }
    }
  }
</script>

<style scoped>

</style>