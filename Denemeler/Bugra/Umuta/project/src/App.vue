<template>
  <v-app>
    <v-main>
      <CheckAccount/>
    </v-main>
  </v-app>
</template>

<script>
import CheckAccount from './components/CheckAccount';

export default {
  name: 'App',

  components: {
    CheckAccount,
  },

};
</script>
