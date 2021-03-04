<template>
  <div class="container">
    <Navbar
        :cart="cart"
        :cart-total="cartTotal"
        :cart-qty="cartQty"
        @delete-item="deleteItem"
    />
    <div class="container">
      <router-view
          :products="products"
          :cart="cart"
          @addItem="addItem"
          @delete-item="deleteItem"
          :cart-total="cartTotal"
      />
    </div>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";


  export default {
    components: {Navbar},

    data() {
      return {
        cart: [],
        products: []
      }
    },

    computed: {
      cartTotal() {
        let sum = 0;
        for (let key in this.cart) {
          sum = sum + this.cart[key].product.price * this.cart[key].qty;
        }
        return sum;
      },

      cartQty() {
        let qty = 0;
        for (let key in this.cart) {
          qty = qty + this.cart[key].qty;
        }
        return qty;
      }
    },

    methods: {
      addItem(product) {
        let whichProduct;
        let existing = this.cart.filter((item, index) => {
          if (item.product.id == Number(product.id)) {
            whichProduct = index;
            return true;
          } else {
            return false;
          }
        })

        if (existing.length) {
          this.cart[whichProduct].qty++;
        } else {
          this.cart.push({product: product, qty: 1});
        }
      },

      deleteItem(id) {
        if (this.cart[id].qty > 1) {
          this.cart[id].qty--;
        } else {
          this.cart.splice(id, 1);
        }
      }
    },

    created() {
      fetch("https://hplussport.com/api/products/order/price")
        .then(response => response.json())
        .then(data => this.products = data)
    }
  }
</script>

<style lang="scss">
  $primary: #6f42c1;
  @import "node_modules/bootstrap/scss/bootstrap";


</style>