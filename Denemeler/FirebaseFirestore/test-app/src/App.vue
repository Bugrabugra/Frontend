<template>
  <v-app>
    <v-main class="back">
      <Layout/>
    </v-main>
  </v-app>
</template>

<script>
  import Layout from "./components/Layout";
  export default {
    name: 'App',

    components: {
      Layout
    },

    data: () => ({

    }),
  };
</script>

<style>
  .back {
    background-color: darkcyan;
  }
</style>