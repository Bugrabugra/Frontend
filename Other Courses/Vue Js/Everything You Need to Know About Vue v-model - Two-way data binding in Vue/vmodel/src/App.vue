<template>
  <!--<VModel/>-->
  <CustomTextInput
      v-model:valFirstName="firstName"
      v-model:valLastName="lastName"
  />
  <p>First Name: {{firstName}}</p>
  <p>Last Name: {{lastName}}</p>
</template>

<script setup>
  import VModel from "./components/VModel.vue";
  import CustomTextInput from "./components/CustomTextInput.vue";
  import {ref} from "vue";

  const firstName = ref("");
  const lastName = ref("");
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
