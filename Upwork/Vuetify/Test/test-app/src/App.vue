<template>
  <v-app>
    <TopBar/>
    <v-main>
      <Drawer/>
      <Layout/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
  import Layout from "./components/Layout";
  import TopBar from "./components/TopBar";
  import Drawer from "./components/Drawer";
  import Footer from "./components/Footer";
  export default {
    name: 'App',

    components: {
      Footer,
      Drawer,
      TopBar,
      Layout
    },

    data: () => ({
      //
    }),
  }
</script>
