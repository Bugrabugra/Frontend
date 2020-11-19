<template>
  <v-main>
    <v-container fluid pa-0>
      <v-row align="center" justify="center" style="height: 100vh">
        <v-col cols="12" class="fill-height d-flex flex-column justify-center align-center">
          <v-img height="100vh" width="100vv" src="@/assets/background.jpg"></v-img>

          <v-card elevation="8" style="position:absolute;">
            <v-card-title class="justify-center pa-2">
              {{cLoginType ? (cLoginType === "citizen" ? "Vatandaş " : "Kurum ") : ""}}Giriş
            </v-card-title>
            <hr>
            <v-card-text>
              <v-btn v-on:click="emptyFieldsLogin('citizen')" active-class="active" color="light-green" class="ma-2"><v-icon>mdi-account-outline</v-icon>Vatandaş</v-btn>
              <v-btn v-on:click="emptyFieldsLogin('state')" active-class="active" color="blue" class="ma-2"><v-icon>mdi-home-variant-outline</v-icon>Kurum</v-btn>

              <v-form>
                <v-container v-if="cLoginType === 'citizen'">
                  <v-text-field
                     label="T.C. Kimlik No:"
                     v-model="user"
                  ></v-text-field>
                  <v-text-field
                      label="Şifre:"
                      v-model="pass"
                  ></v-text-field>
                </v-container>
                <v-container v-else-if="cLoginType === 'state'">
                  <v-text-field
                      label="E-posta:"
                      v-model="user"
                  ></v-text-field>
                  <v-text-field
                      label="Şifre:"
                      v-model="pass"
                  ></v-text-field>
                </v-container>

                <v-btn
                    block
                    v-on:click="login"
                    v-if="cLoginType && user && pass"
                    color="purple lighten-4"
                ><v-icon>mdi-login-variant</v-icon>
                  Giriş
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

</template>

<script>
  import {mapActions} from "vuex";
  import jwt from "jsonwebtoken";

  export default {
    name: "Login",

    data() {
      return {
        user: "",
        pass: ""
      }
    },

    computed: {
      cLoginType() {
        return this.$store.state.loginType;
      }
    },

    methods: {
      ...mapActions([
        "aChangeLoginType",
        "aLogin",
        "aLogout"
      ]),

      emptyFieldsLogin(loginType) {
        this.aChangeLoginType(loginType);
        this.user = "";
        this.pass = "";
      },

      login() {
        this.aLogin({user: this.user, pass: this.pass})
          .then((response) => {
            if (this.$store.state.loginType === "citizen") {
              this.$router.push({name: "Citizen", params: response.data.user});
            } else if (this.$store.state.loginType === "state") {
              jwt.verify(response.data.token, "clerk", (error, decoded) => {
                if (decoded) {
                  this.$router.push({name: "Clerk", params: response.data.user});
                } else {
                  jwt.verify(response.data.token, "admin", (error, decoded) => {
                    if (decoded) {
                      this.$router.push({name: "Admin", params: response.data.user});
                    } else {
                      alert("Yanlış kullanıcı adı / şifre");
                    }
                  })
                }
              });
            }
        }).catch(error => {
          console.log(error);
        })
      },

      // login() {
      //   this.aLogin({user: this.user, pass: this.pass})
      //     .then((response) => {
      //       console.log(response);
      //       if (this.$store.state.loginType === "citizen") {
      //         jwt.verify(response.data.token, "citizen", (error, decoded) => {
      //           if (decoded) {
      //             this.$router.push({name: "Citizen", params: response.data.user});
      //           } else {
      //             alert("Yanlış kullanıcı adı / şifre");
      //           }
      //         });
      //
      //       } else if (this.$store.state.loginType === "state") {
      //         jwt.verify(response.data.token, "clerk", (error, decoded) => {
      //           if (decoded) {
      //             this.$router.push({name: "Clerk", params: response.data.user});
      //           } else {
      //             jwt.verify(response.data.token, "admin", (error, decoded) => {
      //               if (decoded) {
      //                 this.$router.push({name: "Admin", params: response.data.user});
      //               } else {
      //                 alert("Yanlış kullanıcı adı / şifre");
      //               }
      //             })
      //           }
      //         });
      //       }
      //     }).catch(error => {
      //     console.log(error);
      //   })
      // }


    }
  }
</script>

<style scoped>
</style>