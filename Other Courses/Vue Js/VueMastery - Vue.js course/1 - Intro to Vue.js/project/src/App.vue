<template>
  <div class="product">
    <div class="product-image">
      <img :src="image" style="border: 1px solid #d8d8d8; width: 70%; margin: 40px; box-shadow: 0px .5px 1px #d8d8d8;">
    </div>

    <div class="product-info">
      <h1>{{title}}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of stock</p>

      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>

      <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{backgroundColor: variant.variantColor}"
          @mouseover="updateProduct(index)"
      >
        <p @mouseover="updateProduct(variant.variantImage)"></p>
      </div>

      <button
          @click="addToCart"
          :disabled="!inStock"
          :class="{disabledButton: !inStock}"
      >Add to Cart</button>

      <div class="cart">
        <p>Cart({{cart}})</p>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',

    data() {
      return {
        brand: "Vue Mastery",
        product: "Socks",
        selectedVariant: 0,
        inStock: false,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
          {
            variantId: 2234,
            variantColor: "green",
            variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
            variantQuantity: 10
          },
          {
            variantId: 2235,
            variantColor: "blue",
            variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
            variantQuantity: 0
          }
        ],
        cart: 0
      }
    },

    computed: {
      title() {
        return this.brand + " " + this.product;
      },

      image() {
        return this.variants[this.selectedVariant].variantImage;
      },

      inStock() {
        return this.variants[this.selectedVariant].variantQuantity;
      }
    },

    methods: {
      addToCart() {
        this.cart += 1;
      },

      updateProduct(index) {
        this.selectedVariant = index;
      }
    }
  }
</script>

<style>
  body {
    font-family: tahoma, sans-serif;
    color: #282828;
    margin: 0px;
  }

  .nav-bar {
    background: linear-gradient(-90deg, #84CF6A, #16C0B0);
    height: 60px;
    margin-bottom: 15px;
  }

  .product {
    display: flex;
  }

  img {
    border: 1px solid #d8d8d8;
    width: 70%;
    margin: 40px;
    box-shadow: 0px .5px 1px #d8d8d8;
  }

  .product-image {
    flex-basis: 700px;
  }

  .product-info {
    margin-top: 10px;
    flex-basis: 500px;
  }

  .color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
  }

  .cart {
    margin-right: 25px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 5px 20px;
  }

  button {
    margin-top: 30px;
    border: none;
    background-color: #1E95EA;
    color: white;
    height: 40px;
    width: 100px;
    font-size: 14px;
  }

  .disabledButton {
    background-color: #d8d8d8;
  }

  .review-form {
    width: 30%;
    padding: 20px;
    border: 1px solid #d8d8d8;
  }

  input {
    width: 100%;
    height: 25px;
    margin-bottom: 20px;
  }

  textarea {
    width: 100%;
    height: 60px;
  }
</style>
