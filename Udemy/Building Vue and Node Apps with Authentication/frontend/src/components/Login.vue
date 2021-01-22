<template>
  <v-flex sm8 offset-sm2>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field v-model="userName" label="User Name" required/>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field v-model="password" label="Password" required/>
            </v-flex>
          </v-layout>
          <v-btn @click="login">Login</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: "Login",

    data() {
      return {
        userName: "",
        password: ""
      }
    },

    methods: {
      async login() {
        await this.$store.dispatch("login", {userName: this.userName, password: this.password});
      }
    }
  }
</script>