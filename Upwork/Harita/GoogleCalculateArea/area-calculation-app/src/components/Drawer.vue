<template>
  <!--This is the drawer for computer screens-->
  <v-navigation-drawer permanent app style="background-color: #8FB5F0">
    <!--Address component-->
    <Address/>

    <v-divider/>

    <!--List component-->
    <List/>

    <v-divider/>

    <!--Buttons component-->
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
    }
  }
</script>