<template>
  <div id="container">
    <Header v-bind:quoteCount="quotes.length" v-bind:maxQuotes="maxQuotes"></Header>
    <NewQuote v-on:quoteAdded="newQuote"></NewQuote>
    <QuoteGrid v-bind:quotes="quotes" v-on:quoteDeleted="deleteQuote"></QuoteGrid>
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">Info: Click on a Quote to Delete it!</div>
      </div>
    </div>
  </div>
</template>

<script>
  import QuoteGrid from "./components/QuoteGrid";
  import NewQuote from "./components/NewQuote";
  import Header from "./components/Header";


  export default {
    name: 'App',

    data() {
      return {
        quotes: ["Just a Quote to see something"],
        maxQuotes: 10
      }
    },

    components: {
      Header,
      NewQuote,
      QuoteGrid
    },

    methods: {
      newQuote(quote) {
        if (this.quotes.length >= this.maxQuotes) {
          return alert("Please delete a Quote first!");
        }
        this.quotes.push(quote);
      },

      deleteQuote(index) {
        this.quotes.splice(index, 1);
      }
    }
  }
</script>

<style>

</style>
