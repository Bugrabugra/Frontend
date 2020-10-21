<template>
  <div>
    <keep-alive>
      <component v-bind:is="component"></component>
      <button v-on:click="component = 'form-one'">Show form one</button>
      <button v-on:click="component = 'form-two'">Show form two</button>
    </keep-alive>
  </div>
</template>

<script>
  import formOne from "./components/formOne";
  import formTwo from "./components/formTwo";

  export default {
    components: {
      "form-one": formOne,
      "form-two": formTwo
    },
    data () {
      return {
        component: "form-two"
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
