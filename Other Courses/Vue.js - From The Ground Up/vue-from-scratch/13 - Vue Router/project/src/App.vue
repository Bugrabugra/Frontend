<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/user/123">User</router-link></li>
      <li><router-link to="/tasks">Tasks</router-link></li>
    </ul>

    <router-view></router-view>

  </div>
</template>

<script>
  export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {

}
</style>
