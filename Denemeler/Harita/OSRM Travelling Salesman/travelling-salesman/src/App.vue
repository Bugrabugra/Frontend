<template>
  <v-app>
    <div class="home">
      <v-row no-gutters>
        <v-col cols="3"><Menu/></v-col>
        <v-col cols="9"><Map/></v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
  import Map from "./components/Map";
  import Menu from "./components/Menu";


  export default {
    name: 'App',

    components: {
      "Map": Map,
      "Menu": Menu
    }
  }
</script>
