<template>
  <section class="container">
    <RangeSelector :products="filteredProducts" v-model="max"/>
    <ProductList :products="filteredProducts"/>
  </section>
</template>

<script>
  import Product from "../components/Product";
  import RangeSelector from "../components/RangeSelector";
  import ProductList from "../components/ProductList";


  export default {
    name: 'Home',

    components: {
      ProductList,
      RangeSelector,
      Product
    },

    data() {
      return {
        max: 50,
        cart: []
      }
    },

    props: ["products"],

    computed: {
      filteredProducts() {
        return this.products.filter(item => (item.price < Number(this.max)))
      },
    }
  }
</script>
