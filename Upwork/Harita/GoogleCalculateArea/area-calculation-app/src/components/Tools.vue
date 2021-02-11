<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col>
        <!--Tooltip for draw-->
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <div v-on="on">

              <!--Draw button-->
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
          <!--Tooltip message-->
          <span>Right click to cancel drawing</span>
        </v-tooltip>

        <!--Tooltip for draw (cancel mode)-->
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <div v-on="on">

              <!--Draw button-->
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
          <!--Tooltip message-->
          <span>Right click to cancel drawing</span>
        </v-tooltip>

      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--Tooltip for estimate button-->
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <!--Estimate button-->
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
            <!--Tooltip message-->
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

      // Checking if the page was loaded in mobile device
      mini() {
        if (
          this.$vuetify.breakpoint.name === "md" ||
          this.$vuetify.breakpoint.name === "sm" ||
          this.$vuetify.breakpoint.name === "xs"
        ) {
          return true;
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