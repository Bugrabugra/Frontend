<template>
  <v-app>
    <v-main>
      <router-view>
        <EditMap/>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
  import EditMap from "./views/EditMap";


  export default {
    name: 'App',
    components: {EditMap},
    methods: {

    }
  };
</script>
