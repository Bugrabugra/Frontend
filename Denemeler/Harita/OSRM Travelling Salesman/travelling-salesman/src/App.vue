<template>
  <v-app>
    <div class="home">
      <v-row no-gutters>
        <v-col cols="3">
          <Menu
              v-on:eventSolve="startSolve"
              v-on:eventStartAnimation="startAnimation"
              v-bind:coordinatesNames="arrayCoordName"
              v-bind:Result="solveResult"
          />
        </v-col>

        <v-col cols="9">
          <Map
              v-on:eventCoordinateAdded="updateCoordinates"
              v-on:eventSolved="actionSolved"
              v-bind:eventSolve="solve"
              v-bind:animation="animat"
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
        arrayCoordName: [],
        coordinatesToBeDeleted: [],
        solve: false,
        solveResult: {},
        animat: {}
      }
    },

    methods: {
      updateCoordinates(payload) {
        this.arrayCoordName = payload;
      },

      startSolve() {
        this.solve = true;
      },

      actionSolved(payload) {
        this.solveResult = payload;
      },

      startAnimation(payload) {
        if (payload) {
          this.animat = {speed: "fast"};
        } else {
          this.animat = {speed: "slow"};
        }
      }
    }
  }
</script>

<style scoped>

</style>