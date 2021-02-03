<template>
  <v-app style="background-color: #013e3e">
    <v-main>
      <Pumper/>
      <!--<Dashboard class="ma-10"/>-->
    </v-main>
  </v-app>
</template>

<script>
// import Dashboard from './components/Dashboard';

import Pumper from "./components/Pumper";
export default {
  name: 'App',

  components: {
    Pumper,
  },

  data: () => ({
    //
  }),
};
</script>
