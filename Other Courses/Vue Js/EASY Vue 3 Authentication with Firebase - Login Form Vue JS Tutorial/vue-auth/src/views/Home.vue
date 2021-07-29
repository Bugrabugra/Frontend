<template>
  <div class="home">
    <h1>Welcome, {{name}}</h1>
    <router-link to="/about">About</router-link>
    <br>
    <button class="logout" @click="logout">Logout</button>
  </div>
</template>

<script>
  import firebase from "firebase"
  import {ref, onBeforeMount} from "vue";


  export default {
    name: 'Home',
    setup() {
      const name = ref("");

      onBeforeMount(() => {
        const user = firebase.auth().currentUser;

        if (user) {
          name.value = user.email.split("@")[0];
        }
      })

      const logout = () => {
        firebase
          .auth()
          .signOut()
      }

      return {logout, name}
    }
  }
</script>
