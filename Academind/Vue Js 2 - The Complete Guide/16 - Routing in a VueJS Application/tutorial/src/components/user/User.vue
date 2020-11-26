<template>
  <div>
    <h1>The User Page</h1>
    <hr>
    <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "User",

    methods: {
      navigateToHome() {
        this.$router.push({name: "Home"});
      }
    }
  }
</script>