<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="500px"
    >
      <v-card>
        <v-card-text class="ma-0 pa-0">
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <v-text-field
                    v-model="customerName"
                    label="Name"
                    prepend-inner-icon="mdi-account"
                    hide-details
                    outlined
                    clearable
                    autofocus
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                    v-model="customerSurname"
                    label="Surname"
                    hide-details
                    outlined
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                    v-model="customerEmail"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    hide-details
                    outlined
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                    v-model="totalPolygons"
                    label="Total polygons being sent"
                    prepend-inner-icon="mdi-texture-box"
                    hide-details
                    outlined
                    disabled
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                    v-model="totalArea"
                    label="Total Area"
                    prepend-inner-icon="mdi-sigma"
                    hide-details
                    outlined
                    disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="address"
                    label="Address"
                    prepend-inner-icon="mdi-map-marker"
                    hide-details
                    outlined
                    disabled
                ></v-text-field>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="#3f3114"
              @click="hideDialog"
              class="white--text"
          >
            Close
          </v-btn>
          <v-btn
              color="#173c00"
              @click="sendReport"
              class="white--text"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
  export default {
    name: "SendReportDialog",

    data() {
      return {
        customerName: "",
        customerSurname: "",
        customerEmail: "",
      }
    },

    computed: {
      dialog() {
        return this.$store.state.showReportDialog;
      },

      totalPolygons() {
        return this.$store.state.polygons.length;
      },

      address() {
        return this.$store.state.longAddress;
      },

      totalArea() {
        if (this.$store.state.totalArea) {
          return `${this.$store.state.totalArea.toFixed(0)} m2`;
        }
      }
    },

    methods: {
      hideDialog() {
        this.$store.dispatch("showReportDialog", false);
      },

      setCustomerInfos() {
        const payload = {
          customerName: this.customerName,
          customerSurname: this.customerSurname,
          customerEmail: this.customerEmail
        }

        this.$store.dispatch("saveCustomerInfos", payload);
      },

      sendReport() {
        this.setCustomerInfos();
        this.$store.dispatch("sendReport");
      }
    }
  }
</script>

<style scoped>

</style>