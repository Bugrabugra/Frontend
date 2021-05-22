<template>
  <v-container>
    <v-row>
      <!--Cols value changes the width of the components-->
      <v-col :cols="isMini ? 7 : ''" class="pa-0 pl-2">
        <h4 v-if="getPolygons.length < 1 && isMini" style="font-weight: normal; font-size: 0.8rem;">
          <Tutorial/>
        </h4>

        <v-list class="mt-1 pr-2" style="max-height: 150px; overflow-y: auto" id="list">
          <v-list-item
              v-for="polygon in getPolygons"
              :key="polygon.geometry"
              class="item pa-0"
              :dense="isMini"
          >
            <v-list-item-content class="pa-0 ma-0">
              <v-list-item-title class="pl-2" style="font-weight: bold">{{polygon.name}}</v-list-item-title>
              <v-list-item-subtitle class="pl-2">
                {{parseInt(polygon.area).toLocaleString()}} ft²
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon class="pa-0 ma-0 mt-md-1 mt-sm-1 mt-xs-2">
              <v-btn @click="deletePolygon(polygon.geometry)" icon plain>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-icon>

          </v-list-item>
        </v-list>

        <!--For computer screens-->
        <!--If as least 1 polygon was created then this component appears-->
        <h4 v-if="getPolygons.length && !isMini" class="font-weight-medium mt-2">Total: {{polygonsTotalArea.toLocaleString()}} ft²</h4>
        <v-divider v-if="isMini" vertical/>
      </v-col>

      <v-col v-if="isMini" cols="5" class="pa-0">
        <Tools/>
        <!--For mobile devices-->
        <!--If as least 1 polygon was created then this component appears-->
        <h4 v-if="getPolygons.length && isMini" class="text-center font-weight-medium mt-2">Total: {{polygonsTotalArea.toLocaleString()}} ft²</h4>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import Tools from "./Tools";
  import {mapGetters} from "vuex";
  import Tutorial from "./Tutorial";


  export default {
    name: "List",

    components: {
      Tutorial,
      Tools
    },

    computed: {
      ...mapGetters(["getPolygons", "isMini"]),

      polygonsTotalArea() {
        let total = 0;

        this.getPolygons.forEach(polygon => {
          total += parseInt(polygon.area);
        })
        return total;
      }
    },

    watch: {
      polygonsTotalArea() {
        this.$store.dispatch("setTotalArea", this.polygonsTotalArea);
      }
    },

    methods: {
      deletePolygon(geometry) {
        this.$store.dispatch("deletePolygon", geometry);
        this.$store.dispatch("drawPolygons");
      },
    }
  }
</script>

<style scoped>
  .item {
    border: 1px solid darkolivegreen;
    background-color: #95c96d;
    border-radius: 3px;
  }
  .item:hover {
    background-color: #73a74e;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #b7bbc2;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #173c00;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #139584;
  }

  .theme--light.v-sheet {
    background-color: transparent;
  }
</style>