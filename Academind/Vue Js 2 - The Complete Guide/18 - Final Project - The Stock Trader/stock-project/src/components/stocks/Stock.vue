<template>
  <div class="col mb-4">
    <div class="card">
      <div class="card-header bg-success">
        <h3 class="card-title">
          {{stock.name}}
          <small>(Price: {{stock.price}})</small>
        </h3>
      </div>
      <div class="card-body">
        <div class="float-left">
          <input
              type="number"
              class="form-control"
              placeholder="Quantity"
              v-model="quantity"
              :class="{danger: insufficientFunds}"
          >
        </div>
        <div class="float-right">
          <button
              class="btn btn-success"
              @click="buyStock"
              :disabled="insufficientFunds || quantity <= 0"
          >{{insufficientFunds ? "Insufficient funds" : "Buy"}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Stock",

    props: ["stock"],

    data() {
      return {
        quantity: 0
      }
    },

    computed: {
      funds() {
        return this.$store.getters.funds;
      },

      insufficientFunds() {
        return this.quantity * this.stock.price > this.funds;
      }
    },

    methods: {
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        }
        this.$store.dispatch("buyStock", order)
        this.quantity = 0;
      }
    }
  }
</script>

<style scoped>
  .danger {
    border: 1px solid red;
  }
</style>