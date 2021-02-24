<template>
  <div id="app">
    <div v-bind:class="classObject">{{value}}</div>
    <div v-bind:style="{fontSize: (value * 10) + 'px'}">{{value}}</div>

    <button type="button" v-on:click="value++">+</button>
    <button type="button" v-on:click="value--">-</button>
    <button type="button" v-on:click="error = !error">Warning</button>
    <button type="button" v-on:click="warning = !warning">Warning</button>
  </div>
</template>

<script>



  export default {
    name: 'App',
    components: {

    },

    data() {
      return {
        value: 1,
        error: false,
        warning: false
      }
    },

    computed: {
      classObject() {
        return {
          "red-error": this.value > 5,
          "green-error": this.value <= 5,
          "yellow-warning": this.warning
        }
      }
    }
  }
</script>

<style>
  body {
    font-size: 40px;
    text-align: center;
    padding-top: 100px;
  }

  .red-error {
    background: darkred;
  }

  .yellow-warning {
    text-decoration: underline;
  }

  .green-warning {
    background: darkgreen;
  }
</style>
