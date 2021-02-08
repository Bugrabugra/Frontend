<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-btn
                  v-show="!$store.state.drawPolygon"
                  @click="toggleDraw"
                  color="#173c00"
                  style="width: 100%"
                  class="white--text"
                  id="draw"
              >
                <v-icon class="pr-2">
                  mdi-pencil-plus
                </v-icon>
                {{mini ? "" : "Draw New Area"}}
              </v-btn>
            </div>
          </template>
          <span>Right click to cancel drawing</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-btn
                  v-show="$store.state.drawPolygon"
                  color="#173c00"
                  @click="toggleDraw"
                  style="width: 100%"
                  class="white--text"
                  id="not-draw"
              >
                <v-icon class="pr-2">
                  mdi-close-circle
                </v-icon>
                {{mini ? "" : "Draw New Area"}}
              </v-btn>
            </div>
          </template>
          <span>Right click to cancel drawing</span>
        </v-tooltip>

      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn
                    v-on="on"
                    @click="openReportDialog"
                    color="#173c00"
                    :disabled="!enableSendReport"
                    dark
                    block
                >
                  <v-icon class="pr-2">
                    mdi-currency-usd
                  </v-icon>
                  {{mini ? "" : "Request Estimate"}}
                </v-btn>
              </div>
            </template>
            <span>You must draw at least 1 area</span>
            <hr>
            <span>And search an address</span>

          </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Tools",

    data() {
      return {
        drawActive: false
      }
    },

    computed: {
      enableSendReport() {
        return this.$store.state.polygons.length > 0 && this.$store.state.longAddress;
      },

      mini() {
        if (
          this.$vuetify.breakpoint.name === "md" ||
          this.$vuetify.breakpoint.name === "sm" ||
          this.$vuetify.breakpoint.name === "xs"
        ) {
          return true
          // this.mini = true;
        }
      }
    },

    methods: {
      toggleDraw() {
        this.$store.dispatch("startDraw");
      },

      openReportDialog() {
        this.$store.dispatch("showReportDialog", true);
      }
    }
  }
</script>

<style scoped>

</style>