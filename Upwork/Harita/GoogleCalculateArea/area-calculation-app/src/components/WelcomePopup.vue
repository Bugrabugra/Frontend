<template>
  <v-row justify="center">
    <v-dialog
        v-model="getWelcomePopup"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-container>
          <v-row>
            <v-col>
              <v-img
                  max-height="150"
                  max-width="250"
                  src="../assets/Logo.svg"
                  class="logo text-center ma-auto mt-2"
              />
            </v-col>
          </v-row>

          <v-card-text class="ma-2">
            Welcome to the Healthy Lawn Pros Lawn Measure Tool! To get started, enter your street address below. When your address appears in the menu, click on it.
          </v-card-text>

          <v-row justify="center">
            <v-col cols="8">
              <Address/>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import Address from "./Address";
  import {mapGetters} from "vuex";


  export default {
    name: "WelcomePopup",

    components: {Address},

    computed: {
      ...mapGetters(["getAddress", "getWelcomePopup"])
    },

    watch: {
      getAddress() {
        if (this.getAddress) {
          this.dialog = false;
        }
      }
    }
  }
</script>

<style scoped>
  .logo {
    background-color: white;
  }
</style>