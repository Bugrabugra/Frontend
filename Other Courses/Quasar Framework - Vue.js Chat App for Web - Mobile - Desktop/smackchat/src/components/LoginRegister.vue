<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab !== 'login'"
      v-model="formData.name"
      label="Name"
      class="q-mb-md"
      outlined
    />

    <q-input
      v-model="formData.email"
      label="Email"
      class="q-mb-md"
      type="email"
      outlined
    />

    <q-input
      v-model="formData.password"
      label="Password"
      class="q-mb-md"
      type="password"
      outlined
    />

    <div class="row">
      <q-space/>
      <q-btn
        type="submit"
        color="primary"
        :label="tab"
      />
    </div>

  </q-form>
</template>

<script>
  export default {
    name: "LoginRegister",

    props: ["tab"],

    data() {
      return {
        formData: {
          name: "",
          email: "",
          password: ""
        }
      }
    },

    methods: {
      submitForm() {
        if (this.tab === "login") {
          console.log("Login the user")
        } else {
          console.log("Register the user")
        }
      }
    }
  }
</script>

<style scoped>

</style>
