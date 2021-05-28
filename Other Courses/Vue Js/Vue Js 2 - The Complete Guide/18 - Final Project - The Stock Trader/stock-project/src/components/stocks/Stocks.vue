<template>
  <div>
    <div class="container">
      <div class="row row-cols-3">
        <app-stock :stock="stock" v-for="(stock, index) in stocks" :key="index">{{stock.name}} - {{stock.price}}</app-stock>
      </div>
    </div>
  </div>
</template>

<script>
  import Stock from "./Stock";


  export default {
    name: "Stocks",

    components: {
      appStock: Stock
    },

    computed: {
      stocks() {
        return this.$store.getters.stocks;
      }
    }
  }
</script>

<style scoped>

</style>