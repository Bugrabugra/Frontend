<template>
  <!--This is the drawer for mobile devices-->
  <v-bottom-sheet :value="true" no-click-animation hide-overlay eager persistent>
    <v-card style="background-color: #8FB5F0; border-radius: 0; max-height: 400px;">
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