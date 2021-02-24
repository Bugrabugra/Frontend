<template>
  <form class="form" @submit.prevent="submit">
    <MyInput
        name="Username"
        :rules="{required: true, min: 5}"
        :value="username.value"
        @update="update"
        type="text"
    />

    <MyInput
        name="Password"
        :rules="{required: true, min: 10}"
        :value="password.value"
        @update="update"
        type="password"
    />

    <MyButton
        color="white"
        background="darkslateblue"
        :disabled="!valid"
    />
  </form>

</template>

<script>
  import MyButton from "./components/MyButton";
  import MyInput from "./components/MyInput";
  export default {
    name: 'App',
    components: {MyInput, MyButton},
    data() {
      return {
        username: {
          value: "",
          valid: false
        },
        password: {
          value: "",
          valid: false
        }
      }
    },

    computed: {
      valid() {
        return this.username.valid && this.password.valid
      }
    },

    methods: {
      submit($evt) {
        console.log($evt)
      },

      update(payload) {
        console.log(payload);
        this[payload.name.toLowerCase()] = {
          value: payload.value,
          valid: payload.valid
        };
      }
    }
  }
</script>

<style>
  body {
    font-family: Arial, sans-serif;
  }

  .form {
    max-width: 400px;
    width: 50%;
  }
</style>
