<template>
  <v-app-bar app color="#7952b3" height="70">
    <v-app-bar-title>
      <v-row align="center">
        <v-col cols="4">
          <router-link to="/" class="nav-item font-weight-light">Home</router-link>
          <router-link to="/" class="nav-item font-weight-light">Docs</router-link>
          <router-link to="/" class="nav-item font-weight-light">Examples</router-link>
          <router-link to="/" class="nav-item font-weight-light">Icons</router-link>
          <router-link to="/" class="nav-item font-weight-light">Themes</router-link>
          <router-link to="/" class="nav-item font-weight-light">Blog</router-link>
        </v-col>

        <v-spacer/>
        <v-col>
          <v-icon>mdi-github</v-icon>
        </v-col>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .nav-item {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    margin: 5px;
    padding: 5px;
  }
</style>