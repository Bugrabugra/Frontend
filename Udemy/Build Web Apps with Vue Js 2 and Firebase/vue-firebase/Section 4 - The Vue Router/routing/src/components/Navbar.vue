<template>
  <nav class="main-nav">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link v-bind:to="{name: 'About'}">About</router-link></li>
    </ul>

    <h2>User Profiles</h2>
    <ul>
      <li v-for="(userId, index) in userIds">
        <router-link v-bind:to="{name: 'ViewProfile', params: {user_id: userId}}" v-bind:key="index">
          <span>Profile {{userId}}</span>
        </router-link>
      </li>
    </ul>

    <h2>Navigation Controls</h2>
    <ul>
      <li><button v-on:click="goBack">Go Back</button></li>
      <li><button v-on:click="goHome">Redirect to Home</button></li>
      <li><button v-on:click="goForward">Go Forward</button></li>
    </ul>

  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        userIds: ["1", "2", "3", "4"]
      }
    },
    methods: {
      goHome() {
        this.$router.push({name: "Home"});
      },
      goBack() {
        this.$router.go(-1);
      },
      goForward() {
        this.$router.go(1);
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: #42b983
  }

  li {
    display: inline-block;
    margin: 10px;
  }

  .router-link-exact-active {
    color: purple;
  }
</style>
