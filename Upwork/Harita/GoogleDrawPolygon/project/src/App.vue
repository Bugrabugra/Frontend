<template>
  <v-app>
    <v-main>
      <router-view>
        <EditMap/>
        <ViewMap/>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
  import EditMap from "./views/EditMap";
  import ViewMap from "./views/ViewMap";
  export default {
  name: 'App',

  components: {
    ViewMap,
    EditMap,
  },

  data: () => ({
    //
  }),
};
</script>
