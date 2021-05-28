<template>
  <nav class="navbar navbar-light sticky-top mr-3">
    <div
        v-if="cart.length"
        class=" w-100 navbar-text ml-auto d-flex justify-content-end position-relative"
    >
      <div
          class="mr-auto d-flex align-items-end flex-column bd-highlight mb-3 position-absolute"
      >
        <div class="mb-2">
          <span class="font-weight-bold bg-white">
            <Curr :amt="cartTotal"/>
          </span>
          <button
              @click="toggleCartMenu"
              class="btn btn-sm btn-success ml-3"
              id="cartDropdown"
              aria-haspopup="true"
              aria-expanded="false"
          >
            <fa icon="shopping-cart" />
            {{ cartQty }}
          </button>
        </div>
        <CartDropdown :cart="cart" :displayCart="displayCart"/>
      </div>
    </div>
  </nav>
</template>

<script>
  import Curr from "./Curr";
  import CartDropdown from "./CartDropdown";


  export default {
    name: "Navbar",

    components: {
      CartDropdown,
      Curr
    },

    props: ["cart", "cartTotal", "cartQty"],

    data() {
      return {
        displayCart: false
      }
    },

    methods: {
      toggleCartMenu() {
        this.displayCart = !this.displayCart;
      }
    }
  }
</script>