<template>
  <!--This is the drawer for computer screens-->
  <v-navigation-drawer permanent app style="background-color: #8FB5F0">
    <!--List component-->
    <List v-if="$store.getters.getPolygons.length > 0"/>

    <v-divider/>

    <!--Buttons component-->
    <Tools/>

    <!--Tutorial-->
    <Tutorial v-if="$store.getters.getLocation"/>
  </v-navigation-drawer>
</template>

<script>
  import List from "./List";
  import Address from "./Address";
  import Tools from "./Tools";
  import Tutorial from "./Tutorial";


  export default {
    name: "Drawer",

    components: {
      Tutorial,
      Tools,
      Address,
      List
    }
  }
</script>