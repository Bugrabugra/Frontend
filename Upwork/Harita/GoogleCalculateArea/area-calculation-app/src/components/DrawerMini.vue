<template>
  <!--This is the drawer for mobile devices-->
  <v-bottom-sheet no-click-animation hide-overlay :value="true" eager persistent>
    <v-card class="light-green darken-1">
      <!--Address component-->
      <Address/>

      <v-divider/>

      <!--List component-->
      <List/>

    </v-card>
  </v-bottom-sheet>
</template>

<script>
  import List from "./List";
  import Address from "./Address";
  import Tools from "./Tools";


  export default {
    name: "DrawerMini",

    components: {
      Tools,
      Address,
      List
    },
  }
</script>