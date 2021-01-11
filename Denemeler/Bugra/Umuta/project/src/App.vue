<template>
  <v-app>
    <v-main>
      <Nav/>
      <CheckAccount/>
    </v-main>
  </v-app>
</template>

<script>
import CheckAccount from './components/CheckAccount';
import Nav from "./components/Nav";

export default {
  name: 'App',

  components: {
    Nav,
    CheckAccount,
  },

};
</script>
