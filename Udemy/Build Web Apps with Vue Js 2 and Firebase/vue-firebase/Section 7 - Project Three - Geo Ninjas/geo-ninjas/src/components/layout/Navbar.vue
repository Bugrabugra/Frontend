<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link v-bind:to="{name: 'GoogleMap'}" class="brand-logo left">GeoNinjas!</router-link>
        <ul class="right">
          <li v-if="!user"><router-link v-bind:to="{name: 'Signup'}">Sign Up</router-link></li>
          <li v-if="!user"><router-link v-bind:to="{name: 'Login'}">Log In</router-link></li>
          <li v-if="user"><a>{{user.email}}</a></li>
          <li v-if="user"><a v-on:click="logout">Log Out</a></li>
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
        user: null
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push({name: "Login"})
          })
      }
    },
    created() {
      // let user = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      })
    }
  }
</script>

<style scoped>

</style>
