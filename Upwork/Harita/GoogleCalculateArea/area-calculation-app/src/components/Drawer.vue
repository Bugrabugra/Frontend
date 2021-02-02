<template>
  <v-navigation-drawer permanent app class="light-green darken-1">
    <Address/>

    <v-divider/>

    <List/>

    <v-divider/>

    <Tools/>

  </v-navigation-drawer>
</template>

<script>
  import List from "./List";
  import Address from "./Address";
  import Tools from "./Tools";


  export default {
    name: "Drawer",

    components: {
      Tools,
      Address,
      List
    },

    data() {
      return {}
    }
  }
</script>

<style scoped>
  .drawer {
    background-color: rgb(139, 180, 91);
  }
</style>