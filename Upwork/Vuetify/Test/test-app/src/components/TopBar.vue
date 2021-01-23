<template>
  <v-app-bar app clipped-left color="primary" dark>
    <v-img max-width="35" src="@/assets/logo.png"/>
    <v-spacer></v-spacer>
    <v-btn text><span><v-icon class="pr-2">mdi-information-outline</v-icon></span>User Guide</v-btn>
    <v-btn text><span><v-icon class="pr-2">mdi-logout</v-icon></span>Logout</v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: "TopBar",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>