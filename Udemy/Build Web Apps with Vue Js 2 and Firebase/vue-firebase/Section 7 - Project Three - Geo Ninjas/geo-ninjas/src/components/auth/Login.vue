<template>
  <div class="login container">
    <form v-on:submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Log In</h2>

      <div class="field">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="password">
      </div>

      <p v-if="feedback" class="red-text center">{{feedback}}</p>

      <div class="field center">
        <button class="btn deep-purple">Log In</button>
      </div>

    </form>
  </div>
</template>

<script>
  import firebase from "firebase";


  export default {
    name: "Login",
    data() {
      return {
        email: null,
        password: null,
        feedback: null
      }
    },
    methods: {
      login() {
        if (this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              console.log(cred.user);
              this.$router.push({name: "GoogleMap"});
            })
            .catch(err => {
              this.feedback = err.message;
            })
          this.feedback = null;
        } else {
          this.feedback = "Please fill in both fields";
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    max-width: 400px;
    margin-top: 60px;
  }

  .login h2 {
    font-size: 2.4em;
  }

  .login .field {
    margin-bottom: 16px;
  }

</style>
