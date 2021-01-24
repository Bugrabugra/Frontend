<template>
  <v-container fill-height fluid class="pa-0 ma-0">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <router-view/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Layout",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>