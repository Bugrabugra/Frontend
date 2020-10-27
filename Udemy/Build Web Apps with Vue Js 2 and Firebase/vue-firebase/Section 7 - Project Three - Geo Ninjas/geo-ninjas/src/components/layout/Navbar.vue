<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link v-bind:to="{name: 'GoogleMap'}">GeoNinjas!</router-link>
        <ul class="right">
          <li><router-link v-bind:to="{name: 'Signup'}">Sign Up</router-link></li>
          <li><router-link v-bind:to="{name: 'Login'}">Log In</router-link></li>
          <li><a v-on:click="logout">Log Out</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  import firebase from "firebase";


  export default {
    name: "Navbar",
    data() {
      return {

      }
    },
    methods: {
      logout() {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push({name: "Login"})
          })
      }
    }
  }
</script>

<style scoped>

</style>
