<template>
  <div>
    <button
        v-for="tab in tabs"
        :key="tab"
        @click="component = tab"
    >
      {{tab}}
    </button>

    <!--create ve mount bir kere çalışıyor-->
    <keep-alive include="Contact">
      <component :is="component"/>
    </keep-alive>
  </div>
</template>

<script>
  import {ref} from "vue";
  import About from "./components/About.vue";
  import Contact from "./components/Contact.vue";


  export default {
    name: "App",
    components: {About, Contact},
    setup() {
      // references
      const tabs = ref(["About", "Contact"]);
      const component = ref("About");

      return {tabs, component}
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
