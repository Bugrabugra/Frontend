<template>
  <v-app>
    <v-app-bar app>
      <v-btn plain to="/">Messages</v-btn>
      <v-btn plain to="/NewMessage">New Message</v-btn>

      <v-spacer/>
      <v-btn plain v-if="!$store.state.token" to="/Register">Register</v-btn>
      <v-btn plain v-if="!$store.state.token" to="/Login">Login</v-btn>
      <v-btn plain v-if="$store.state.token" @click="$store.commit('logout')">Logout</v-btn>


    </v-app-bar>
    <v-main>
      <br>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import Messages from "./components/Messages";
  import NewMessage from "./components/NewMessage";


  export default {
    name: 'App',

    components: {
      NewMessage,
      Messages
    },

    data() {
      return {

      }
    },
  };
</script>
