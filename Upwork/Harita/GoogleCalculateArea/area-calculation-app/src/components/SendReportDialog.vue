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
              <!--Customer name-->
              <v-col cols="12">
                <v-text-field
                    v-model="customerName"
                    :counter="100"
                    :rules="nameRules"
                    label="Name"
                    prepend-inner-icon="mdi-account"
                    outlined
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <!--Customer email-->
              <v-col>
                <v-text-field
                    v-model="customerEmail"
                    :counter="100"
                    :rules="emailRules"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    outlined
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <!--Customer phone number-->
              <v-col>
                <v-text-field
                    v-model="customerPhone"
                    :counter="14"
                    :rules="customerPhone ? phoneRules : []"
                    label="Phone Number"
                    prepend-inner-icon="mdi-phone"
                    outlined
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <!--Customer address-->
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

            <v-row>
              <!--Radio button-->
              <v-col>
                <v-radio-group
                    label="Service Type"
                    v-model="customerChoice"
                    hide-details
                >
                  <v-radio
                      key="diy"
                      label="DIY"
                      value="diy"
                  />

                  <v-radio
                      key="fs"
                      label="Full Service"
                      value="full-service"
                  />
                </v-radio-group>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!--Close button-->
          <v-btn
              color="#3f3114"
              @click="hideDialog"
              class="white--text"
          >
            Close
          </v-btn>

          <!--Send button-->
          <v-btn
              color="#173c00"
              @click="sendReport"
              class="white--text"
          >
            Submit
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
        customerEmail: "",
        customerPhone: "",
        customerChoice: "diy",
        // Here are the email, name and number rules
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 100) || 'Name must be less than 100 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        phoneRules: [
          v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(v) || 'Phone number must be valid',
        ]
      }
    },

    computed: {
      dialog() {
        return this.$store.state.showReportDialog;
      },

      address() {
        return this.$store.state.longAddress;
      },
    },

    methods: {
      hideDialog() {
        this.$store.dispatch("showReportDialog", false);
      },

      setCustomerInfos() {
        const payload = {
          customerName: this.customerName,
          customerEmail: this.customerEmail,
          customerPhone: this.customerPhone,
          customerChoice: this.customerChoice
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