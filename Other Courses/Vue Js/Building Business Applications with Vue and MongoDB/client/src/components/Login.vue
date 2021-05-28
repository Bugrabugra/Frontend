<template>

    <v-form style="width: 50%; margin: auto;">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>Login to Globomantics</h2>
          </v-col>

          <v-col cols="12">
            <v-text-field
                label="E-mail"
                v-model="email"
                :rules="emailRules"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                :type="'password'"
            />

          </v-col>

          <v-col cols="12">
            <v-btn @click="cancel">Cancel</v-btn>
            <v-btn @click="login" color="primary">Login</v-btn>
          </v-col>

        </v-row>

        <v-snackbar
            :timeout="6000"
            v-model="showAlert"
            top
        >
          {{loginError}}
          <v-btn text color="pink" v-on:click="showAlert = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-form>
</template>

<script>
  export default {
    name: "Login",

    data() {
      return {
        showAlert: false,
        message: "",
        email: "",
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: "",
        passwordRules: [
          v => !!v || "Password is required"
        ]
      }
    },

    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },

      loginError() {
        return this.$store.getters.loginError;
      }
    },

    methods: {
      login() {
        const payload = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch("logInUser", payload).then(() => {
          if (this.isLoggedIn) {
            this.$router.push({path: "/"});
          } else {
            this.showAlert = true;
          }
        })
      },

      cancel() {
        console.log("The user does not want to login");
      }
    }
  }
</script>

<style scoped>

</style>