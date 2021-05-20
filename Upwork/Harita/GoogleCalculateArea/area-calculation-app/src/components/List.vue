<template>
  <v-container>
    <v-row>
      <!--Cols value changes the width of the components-->
      <v-col :cols="mini ? 7 : ''">
        <h4 v-if="getPolygons.length < 1 && mini" class="font-weight-medium mt-2">First, search for your property address. Then tap the "draw new area" button on the right. Then trace the area, tapping corner by corner.</h4>

        <v-list style="max-height: 150px; overflow-y: auto" id="list">
          <v-list-item
              v-for="polygon in getPolygons"
              :key="polygon.geometry"
              class="item pa-0"
              :dense="mini"
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
        <h4 v-if="getPolygons.length && !mini" class="font-weight-medium mt-2">Total: {{polygonsTotalArea.toLocaleString()}} ft²</h4>
      </v-col>

      <v-divider v-if="mini" vertical/>

      <v-col v-if="mini" cols="4">
        <Tools/>
        <!--For mobile devices-->
        <!--If as least 1 polygon was created then this component appears-->
        <h4 v-if="getPolygons.length && mini" class="font-weight-medium mt-2">Total: {{polygonsTotalArea.toLocaleString()}} ft²</h4>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import Tools from "./Tools";
  import {mapGetters} from "vuex";


  export default {
    name: "List",
    components: {Tools},
    computed: {
      ...mapGetters(["getPolygons"]),

      polygonsTotalArea() {
        let total = 0;

        this.getPolygons.forEach(polygon => {
          total += parseInt(polygon.area);
        })
        return total;
      },

      mini() {
        if (
          this.$vuetify.breakpoint.name === "md" ||
          this.$vuetify.breakpoint.name === "sm" ||
          this.$vuetify.breakpoint.name === "xs"
        ) {
          return true
        }
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