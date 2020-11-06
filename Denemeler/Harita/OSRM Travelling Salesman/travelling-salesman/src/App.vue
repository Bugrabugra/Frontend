<template>
  <v-app>
    <div class="home">
      <v-row no-gutters>
        <v-col cols="3">
          <Menu
              v-bind:coordinates="arrayCoordinates"
              v-bind:Result="solveResult"
              v-on:eventSolve="startSolve"
          />
        </v-col>

        <v-col cols="9">
          <Map
              v-on:eventCoordinateAdded="updateCoordinates"
              v-bind:eventSolve="solve"
              v-on:eventSolved="actionSolved"
          />
        </v-col>

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
    },

    data() {
      return {
        arrayCoordinates: [],
        coordinatesToBeDeleted: [],
        solve: false,
        solveResult: {}
      }
    },

    methods: {
      updateCoordinates(payload) {
        this.arrayCoordinates = payload;
      },

      // deleteCoordinate(coordinate) {
      //   console.log("Deleting coordinate: ", coordinate);
      //   this.coordinatesToBeDeleted = coordinate
      // }
      startSolve() {
        this.solve = true;
      },

      actionSolved(payload) {
        this.solveResult = payload;
      }
    }
  }
</script>

<style scoped>

</style>