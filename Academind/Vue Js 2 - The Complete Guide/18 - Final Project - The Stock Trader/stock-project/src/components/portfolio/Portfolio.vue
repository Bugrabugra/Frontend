<template>
  <div class="container">
    <div class="row row-cols-3">
      <app-stock v-for="(stock, index) in stocks" :stock="stock" :key="index"></app-stock>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Stock from "./Stock";


  export default {
    name: "Portfolio",

    computed: {
      ...mapGetters({
        stocks: "stockPortfolio"
        }
      )
    },

    components: {
      appStock: Stock
    }
  }
</script>

<style scoped>

</style>