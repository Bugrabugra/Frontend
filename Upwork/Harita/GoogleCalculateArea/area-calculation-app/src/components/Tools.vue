<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col>
        <!--Tooltip for draw-->
        <v-tooltip :disabled="isMini" right>
          <template v-slot:activator="{ on }">
            <div v-on="on">

              <!--Draw button-->
              <v-btn
                  v-show="!$store.state.drawPolygon"
                  @click="toggleDraw"
                  color="#fff"
                  style="width: 100%"
                  class="green--text text--darken-4"
                  id="draw"
              >
                <v-icon v-if="!isMini" class="pr-2">
                  mdi-pencil-plus
                </v-icon>
                Draw New Area
              </v-btn>
            </div>
          </template>
          <!--Tooltip message-->
          <span v-if="!isMini">Right click to cancel drawing</span>
        </v-tooltip>

        <!--Tooltip for draw (cancel mode)-->
        <v-tooltip :disabled="isMini" right>
          <template v-slot:activator="{ on }">
            <div v-on="on">

              <!--Draw button-->
              <v-btn
                  v-show="$store.state.drawPolygon"
                  color="#fff"
                  @click="toggleDraw"
                  style="width: 100%"
                  class="green--text text--darken-4 button"
                  id="not-draw"
              >
                <v-icon v-if="!isMini" class="pr-2">
                  mdi-close-circle
                </v-icon>
                Cancel
              </v-btn>
            </div>
          </template>
          <!--Tooltip message-->
          <span v-if="!isMini">Right click to cancel drawing</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-dialog
            v-model="dialogStartOver"
            width="300"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="#fff"
                style="width: 100%"
                class="green--text text--darken-4"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon v-if="!isMini" class="pr-2">
                mdi-refresh
              </v-icon>
              Start Over
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              Start over?
            </v-card-title>

            <v-card-text>
              Are you sure you want to delete all polygons and start over?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  @click="startOver"
                  color="blue"
              >OK</v-btn>

              <v-btn
                  @click="dialogStartOver = false"
                  color="grey"
              >Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--Tooltip for estimate button-->
          <v-tooltip :disabled="isMini" right>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <!--Estimate button-->
                <v-btn
                    v-on="on"
                    @click="openReportDialog"
                    color="#fff"
                    :disabled="!enableSendReport"
                    class="green--text text--darken-4"
                    dark
                    block
                >
                  <v-icon v-if="!isMini" class="pr-2">
                    mdi-currency-usd
                  </v-icon>
                  {{isMini ? "Request" : "Request Estimate"}}
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

    <!--Logo-->
    <v-row>
      <v-col>
        <v-img
            max-height="150"
            max-width="250"
            src="../assets/Logo.svg"
            class="logo"
            @click="goToMainPage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "Tools",

    data() {
      return {
        drawActive: false,
        dialogStartOver: false
      }
    },

    computed: {
      // Checking if the page was loaded in mobile device
      ...mapGetters(["isMini"]),

      enableSendReport() {
        // return this.$store.state.polygons.length > 0 && this.$store.state.longAddress;
        return this.$store.state.polygons.length;
      }
    },

    methods: {
      initDrawing() {
        // Start drawing
        const _this = this;
        window.google.maps.event.addDomListener(document.getElementById('draw'), 'click', function() {
          _this.$store.state.drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
        });

        // Stop drawing
        window.google.maps.event.addDomListener(document.getElementById('not-draw'), 'click', function() {
          _this.$store.state.drawingManager.setDrawingMode(null);
        });
      },

      toggleDraw() {
        this.$store.dispatch("startDraw");
      },

      openReportDialog() {
        this.$store.dispatch("showReportDialog", true);
      },

      startOver() {
        this.dialogStartOver = false;
        this.$store.dispatch("toggleWelcomePopup", true);
        this.$store.dispatch("setLongAddress", null);
        this.$store.dispatch("clearPolygons");
        this.$store.dispatch("clearLocation");
        this.$store.dispatch("clearMarker");
        this.$store.getters.getMap.setZoom(5);
        this.$store.getters.getMap.setCenter({lat: 36.833, lng: -99.903});
      },

      goToMainPage() {
        window.open("https://healthylawnpros.com", "_blank");
      }
    },

    mounted() {
      this.initDrawing();
    }
  }
</script>

<style scoped>
  .logo {
    background-color: white;
    border: 3px solid white;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
  }
</style>