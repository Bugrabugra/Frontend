<template>
  <Teleport to="#portal-target" v-if="show" >
    <Popup :title="'Popup Test'" :sub="'Buğra Otken 2021'">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      A cum cupiditate distinctio ducimus ipsum laudantium maxime
      reprehenderit similique suscipit ut. Aliquid atque consequatur
      corporis eum obcaecati odit tenetur vitae. Esse!
    </Popup>
  </Teleport>

  <button class="btn" @click="show = !show">
    Open Modal
  </button>
</template>

<script setup>
  import Popup from "./components/Popup.vue";
  import {ref} from "vue";


  const show = ref(false);
</script>

<style lang="scss">
  /* Demo Styles */
  html,
  body {
    height: 100%;
  }

  body {
    font: 600 18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    background-image: linear-gradient(to right, #7f53ac 0, #657ced 100%);
    color: black;
  }

  a {
    color: inherit;
  }

  .container {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  small {
    color: #aaa;
  }

  .btn {
    font-size: 36px;
    background-color: #fff;
    padding: 1em 1.5em;
    border-radius: 3px;
    text-decoration: none;

    i {
      padding-right: 0.3em;
    }
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    z-index: 100;
  }
</style>
