<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div
        class="counter"
        :style="{color: colorCode}"
    >
      {{store.state.counter}}
    </div>

    <div class="counter-squared">
      {{store.state.counter}}
      <sup>2</sup> =
      {{store.getters.counterSquared()}}
    </div>

    <div class="buttons">
      <button @click="store.methods.decreaseCounter">-</button>
      <button @click="store.methods.increaseCounter">+</button>
    </div>

    <div>
      <label>
        <input
            type="text"
            placeholder="Enter color code"
            v-model="colorCode"
        >
      </label>
    </div>
  </div>
</template>

<script>
  import {inject, computed} from "vue";


  export default {
    name: 'Home',
    setup() {
      const store = inject("store");

      const colorCode = computed({
        get() {
          return store.state.colorCode;
        },

        set(value) {
          store.methods.setColorCode(value);
        }
      })

      return {store, colorCode}
    }
  }
</script>

<style>
  div {
    margin-bottom: 10px;
  }

  .counter {
    font-size: 80px;
  }

  .buttons button {
    font-size: 40px;
    width: 100px;
    margin: 0 10px;
  }
</style>
