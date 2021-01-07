<template>
  <form class="form-signin" @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <label for="inputEmail" class="visually-hidden">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">

    <label for="inputPassword" class="visually-hidden">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script>
  import {ref} from "vue";
  import axios from "axios";
  import {useRouter} from "vue-router";


  export default {
    name: "Login",

    setup() {
      const email = ref("");
      const password = ref("");
      const router = useRouter();

      const submit = async () => {
        const response = await axios.post("login", {
          email: email.value,
          password: password.value
        });

        localStorage.setItem("token", response.data.token);
        axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

        await router.push("/");
      }

      return {
        email,
        password,
        submit
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>