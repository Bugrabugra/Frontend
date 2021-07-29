<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="text" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <input type="submit" value="Login">
      <p>Need an account?
        <router-link to="/register">
          Register Here
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
  import {ref} from "vue";
  import firebase from "firebase";


  export default {
    name: "Login",
    setup() {
      const email = ref("");
      const password = ref("");

      const login = () => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(data => console.log(data))
          .catch(error => alert(error.message))
      }

      return {login, email, password}
    }
  }
</script>

<style scoped>

</style>