<template>
  <form class="form-signin" @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>
    <label for="first_name" class="visually-hidden">First Name</label>
    <input type="text" id="first_name" class="form-control" placeholder="First Name" required v-model="firstName">

    <label for="last_name" class="visually-hidden">Last Name</label>
    <input type="text" id="last_name" class="form-control" placeholder="Last Name" required v-model="lastName">

    <label for="inputEmail" class="visually-hidden">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required v-model="email">

    <label for="inputPassword" class="visually-hidden">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">

    <label for="password_confirm" class="visually-hidden">Password Confirm</label>
    <input type="password" id="password_confirm" class="form-control" placeholder="Password Confirm" required v-model="passwordConfirm">

    <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>

  </form>
</template>

<script>
  import {ref} from "vue";
  import axios from "axios";
  import {useRouter} from "vue-router";


  export default {
    name: "Register",
    setup() {
      const firstName = ref("");
      const lastName = ref("");
      const email = ref("");
      const password = ref("");
      const passwordConfirm = ref("");
      const router = useRouter();

      const submit = async () => {
        const response = await axios.post("register", {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        })

        await router.push("/login");
      }

      return {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
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