<template>
  <div class="dropdown-clip" v-if="cart.length > 0">
    <transition name="dropdown">
      <div
          v-if="displayCart"
          class="list-group bg-white"
          aria-labelledby="cartDropdown"
      >
        <div
            v-for="(item, index) in cart"
            :key="index"
        >
          <div class="dropdown-item-text text-nowrap text-right align-middle">
            <span class="badge bg-success align-text-top mr-1">
              {{item.qty}}
            </span>
            {{item.product.name}}
            <b>
              <Curr :amt="item.qty * Number(item.product.price)"/>
            </b>
            <button
                @click.stop="this.$parent.$emit('deleteItem', index)"
                class="btn btn-sm btn-danger ml-2"
            >
              -
            </button>
          </div>
        </div>
        <router-link
            to="/checkout"
            class="btn btn-sm btn-success text-white float-right mr-2 mt-2"
        >
          Checkout
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
  import Curr from "./Curr";


  export default {
    name: "CartDropdown",

    components: {Curr},

    props: ["cart", "displayCart"],

    emits: ["deleteItem"]
  }
</script>

<style scoped>
  .dropdown-clip {
    overflow: hidden;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.5s ease-in-out;
    transform: none;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-300px);
  }
</style>