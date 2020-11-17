<template>
  <v-app>
    <v-container fluid pa-0>
      <v-row align="center" justify="center" style="height: 100vh">
        <v-col cols="12" class="fill-height d-flex flex-column justify-center align-center">
          <v-img height="100vh" width="100vv" src="@/assets/background.jpg"></v-img>

          <v-card elevation="8" style="position:absolute;">
            <v-card-title class="justify-center pa-2">
              {{cLoginType}} Giriş
            </v-card-title>
            <hr>
            <v-card-text>
              <v-btn v-on:click="emptyFieldsLogin('Vatandaş')" active-class="active" color="light-green" class="ma-2"><v-icon>mdi-account-outline</v-icon>Vatandaş</v-btn>
              <v-btn v-on:click="emptyFieldsLogin('Kurum')" active-class="active" color="blue" class="ma-2"><v-icon>mdi-home-variant-outline</v-icon>Kurum</v-btn>

              <v-form>
                <v-container v-if="cLoginType === 'Vatandaş'">
                  <v-text-field
                     label="T.C. Kimlik No:"
                     v-model="user"
                  ></v-text-field>
                  <v-text-field
                      label="Ad Soyad:"
                      v-model="pass"
                  ></v-text-field>
                </v-container>
                <v-container v-else-if="cLoginType === 'Kurum'">
                  <v-text-field
                      label="E-posta:"
                      v-model="user"
                  ></v-text-field>
                  <v-text-field
                      label="Şifre:"
                      v-model="pass"
                  ></v-text-field>
                </v-container>
              </v-form>

              <v-btn v-on:click="login" v-if="cLoginType && user && pass" color="purple lighten-4"><v-icon>mdi-login-variant</v-icon>Giriş</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>

</template>

<script>
  import {mapActions} from "vuex";

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
        "aChangeCitizen",
        "aChangeClerk"
      ]),

      emptyFieldsLogin(loginType) {
        this.aChangeLoginType(loginType);
        this.user = "";
        this.pass = "";
      },

      login() {
        const user = this.user;
        const pass = this.pass;

        if (this.cLoginType === 'Vatandaş') {
          (async () => {
            const res = await fetch("http://localhost:3000/citizen", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({user: user, pass: pass}),
            })
            const result = await res.json();
            await this.aChangeCitizen(result);
            await this.$router.push({
              name: "Citizen"
            });
            console.log(result);
          })();

        } else if (this.cLoginType === 'Kurum') {
          (async () => {
            const res = await fetch("http://localhost:3000/state", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({user: user, pass: pass}),
            })
            const result = await res.json();
            this.aChangeClerk(result);
            console.log(result);
          })();
        }
      }
    }
  }
</script>

<style scoped>
</style>