<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="../img/5.gif">
    <ul v-else>
      <li v-for="product in products">
        {{product.title}} - {{product.price|currency}} - {{product.inventory}}
        <button
          v-bind:disabled="!productIsInStock(product)"
          v-on:click="addProductToCart(product)"
        >Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from "vuex";


  export default {
    name: "ProductList",
    data() {
      return {
        loading: false,
        productIndex: 1
      }
    },
    methods: {
      ...mapActions({
        fetchProducts: "products/fetchProducts",
        addProductToCart: "cart/addProductToCart"
      })
    },
    computed: {
      ...mapState({
        products: state => state.products.items
      }),

      ...mapGetters("products", {
        productIsInStock: "productIsInStock"
      })
    },
    created() {
      // Calling the action
      this.loading = true;
      this.fetchProducts()
        .then(() => {
          this.loading = false;
        })
    }
  }
</script>

<style scoped>

</style>
