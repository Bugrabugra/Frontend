<template>
  <v-app-bar
      color="grey"
  >
    <p style="color: #454444; font-size: 2em; font-weight: bold; margin-top: 10px;">Hoş geldiniz Sn. {{gUser}}</p>
    <v-spacer></v-spacer>

    <v-btn v-on:click="aLogout">
      <v-icon>mdi-logout</v-icon>
    Çıkış
    </v-btn>

  </v-app-bar>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";


  export default {
    name: "Navbar",

    data() {
      return {
        user: ""
      }
    },

    methods: {
      ...mapActions([
        "aLogout"
      ])
    },

    computed: {
      ...mapGetters([
        "gUser"
      ])
    }
  }
</script>

<style scoped>

</style>