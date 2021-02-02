<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400px"
    >
      <v-card>
        <v-card-text class="ma-0 pa-0">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="polygonName"
                    label="Enter Area Name"
                    outlined
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="#173c00"
              @click="hideDialog"
              class="white--text"
          >
            Close
          </v-btn>
          <v-btn
              color="#173c00"
              @click="savePolygon"
              class="white--text"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "Dialog",

    data() {
      return {
        polygonName: ""
      }
    },

    methods: {
      hideDialog() {
        this.$store.dispatch("showDialog", false);
        this.polygonName = "";
      },

      savePolygon() {
        const name = this.polygonName;
        const geometry = this.$store.state.polygonGeometry;
        const decodedGeometry = window.google.maps.geometry.encoding.decodePath(geometry);
        const area = window.google.maps.geometry.spherical.computeArea(decodedGeometry);

        this.$store.dispatch("addPolygon", {name, area, geometry});
        this.hideDialog();

        this.$store.dispatch("drawPolygons");
      }
    },

    computed: {
      dialog() {
        return this.$store.state.dialog;
      }
    }
  }
</script>

<style scoped>

</style>