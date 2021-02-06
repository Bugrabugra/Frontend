<template>
  <v-navigation-drawer permanent app class="light-green darken-1">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col>
          <Menu/>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col cols="12" style="width: 100%">
          <v-btn>View</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
  import Menu from "./TextArea";


  export default {
    name: "Drawer",

    components: {
      Menu,
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