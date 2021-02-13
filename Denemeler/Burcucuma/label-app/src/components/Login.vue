<template>
  <v-container style="margin: auto 0;">
    <v-dialog
        elevation="4"
        v-model="dialog"
        width="400"
        dark
    >
      <v-card elevation="10">
        <v-card-title>
          <v-container>
            <v-row justify="center">
              Hoş geldiniz
            </v-row>

            <v-row justify="center">
              {{email}}
            </v-row>
          </v-container>

        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>

          <v-btn
              color="primary"
              @click="closeDialog"
              block
          >
            KAPAT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card
            elevation="10"
            class="mx-auto"
            tile
            dark
        >
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      v-model="email"
                      label="Email"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      v-model="password"
                      label="Şifre"
                      required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn @click.prevent="login" color="primary" block>
                    GİRİŞ
                  </v-btn>
                </v-col>

              </v-row>
            </v-container>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {auth} from "../firebase/config"


  export default {
    name: "Login",

    data() {
      return {
        email: "",
        password: "",
        dialog: false
      }
    },

    methods: {
      login() {
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(res => {
            if (res.user.email) {
              this.dialog = true;
              this.$store.dispatch("setUser", res.user.email)
            }
          })
      },

      closeDialog() {
        this.dialog = false;
        this.email = "";
        this.password = "";
        this.$router.push("/products");
      }
    }


  }
</script>

<style scoped>

</style>