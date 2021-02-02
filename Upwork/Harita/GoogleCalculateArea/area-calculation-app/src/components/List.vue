<template>
  <v-container>
    <h3 class="font-weight-medium">Polygons List</h3>
    <v-list style="max-height: 400px; overflow-y: auto" id="list">
      <v-list-item
          v-for="polygon in polygons"
          :key="polygon.geometry"
          class="item pa-0"
      >
        <v-list-item-content class="pa-0 ma-0">
          <v-list-item-title class="pl-2" style="font-weight: bold">{{polygon.name}}</v-list-item-title>
          <v-list-item-subtitle class="pl-2">
            {{polygon.area | round}} m2
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon class="pa-0 ma-0 mt-2">
          <v-btn @click="deletePolygon(polygon.geometry)" icon plain>
            <v-icon>mdi-delete</v-icon>
          </v-btn>

          <v-btn @click="zoomPolygon(polygon.geometry)" icon plain>
            <v-icon>mdi-magnify-plus</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <h4 v-if="polygons.length" class="font-weight-medium">Total: {{polygonsTotalArea | round}} m2</h4>

  </v-container>
</template>

<script>
  export default {
    name: "List",

    computed: {
      polygons() {
        return this.$store.state.polygons;
      },

      polygonsTotalArea() {
        let total = 0;

        this.polygons.forEach(polygon => {
          total += polygon.area;
        })

        return total;
      }
    },

    methods: {
      deletePolygon(geometry) {
        this.$store.dispatch("deletePolygon", geometry);
        this.$store.dispatch("drawPolygons");
      },

      zoomPolygon(geometry) {
        this.$store.dispatch("zoomPolygon", geometry);
      }
    },

    filters: {
      round(value) {
        return value.toFixed(3)
      }
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
</style>