<template>
  <v-app-bar
      color="grey">
    <h2 style="color: white">Hoş geldiniz Sn. {{gUser}}</h2>
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