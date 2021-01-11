<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2>Welcome</h2>
      <p class="lead">{{user.first_name}} {{user.last_name}} has invited you to buy these item(s)!</p>
    </div>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Product</span>
        </h4>
        <ul class="list-group mb-3">
          <template v-for="product in products">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">{{product.title}}</h6>
                <small class="text-muted">{{product.description}}</small>
              </div>
              <span class="text-muted">{{product.price}}</span>
            </li>

            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Quantity</h6>
              </div>
              <input v-model="quantities[product.id]" type="number" min="0" class="text-muted form-control quantity">
            </li>
          </template>

          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>${{total}}</strong>
          </li>
        </ul>

      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Personal Info</h4>
        <form @submit.prevent="submit" class="needs-validation" novalidate>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input v-model="first_name" type="text" class="form-control" id="firstName" placeholder="First Name" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input v-model="last_name" type="text" class="form-control" id="lastName" placeholder="Last Name" required>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="you@example.com" required>
          </div>

          <div class="mb-3">
            <label for="address">Address</label>
            <input v-model="address" type="text" class="form-control" id="address" placeholder="1234 Main St" required>
          </div>

          <div class="mb-3">
            <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
            <input v-model="address2" type="text" class="form-control" id="address2" placeholder="Apartment or suite">
          </div>

          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Country</label>
              <input v-model="country" type="text" class="form-control" id="country" placeholder="Country">
            </div>
            <div class="col-md-4 mb-3">
              <label for="city">City</label>
              <input v-model="city" type="text" class="form-control" id="city" placeholder="City">
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Zip</label>
              <input v-model="zip" type="text" class="form-control" id="zip" placeholder="Zip" required>
            </div>
          </div>

          <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from "../plugins/axios";


  export default Vue.extend({
    async asyncData(context){
      const {data} = await axios.get(`/links/${context.params.code}`)
      const user = data.data.user;
      const products = data.data.products;
      const quantities = [];

      products.forEach(
        p => quantities[p.id] = 0
      )

      return {user, products, quantities}
    },

    data() {
      return {
        user: null,
        quantities: [],
        products: [],
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        address2: "",
        country: "",
        city: "",
        zip: ""
      }
    },

    computed: {
      total() {
        let total = 0;

        this.products.forEach(
          p => {
            total += p.price * this.quantities[p.id]
          }
        );

        return total;
      }
    },

    methods: {
      async submit() {
        const {data} = await axios.post(`/orders`, {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          address: this.address,
          address2: this.address2,
          country: this.country,
          city: this.city,
          zip: this.zip,
          code: this.$route.params.code,
          items: this.products.map(p => {
            return {
              product_id: p.id,
              quantity: this.quantities[p.id]
            }
          })
        })
      }
    }
  })
</script>

<style scoped>
  .quantity {
    width: 65px;
  }
</style>
