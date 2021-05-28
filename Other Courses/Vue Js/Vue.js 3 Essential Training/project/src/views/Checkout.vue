<template>
  <div class="container">
    <h1>Checkout</h1>

    <table class="table table-hover" v-if="cart.length">
      <caption class="text-right h3">
        <b>Total:</b>
        <Curr :amt="Number(cartTotal)"/>
      </caption>
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Item</th>
        <th scope="col" class="text-center">Qty</th>
        <th scope="col" class="text-right">Price</th>
        <th scope="col" class="text-right">Sub-total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in cart" :key="item.product.id">
        <td class="text-center">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button @click="this.$emit('addItem', item.product)" class="btn btn-outline-success">
              +
            </button>
            <button @click="this.$emit('deleteItem', index)" class="btn btn-outline-success">
              -
            </button>
          </div>
        </td>
        <th scope="row">{{item.product.name}}</th>
        <td class="text-center">{{item.qty}}</td>
        <td class="text-right">
          <Curr :amt="Number(item.product.price)"/>
        </td>
        <td class="text-right">
          <Curr :amt="item.qty * Number(item.product.price)"/>
        </td>
      </tr>
      </tbody>
    </table>
    <router-link class="btn btn-sm btn-success" to="/">
      Keep Shopping
    </router-link>
  </div>
</template>

<script>
  import Curr from "../components/Curr";
  export default {
    name: "Checkout",
    components: {Curr},
    props: ["cart", "cartTotal"],

    emits: ["addItem", "deleteItem"]
  }
</script>