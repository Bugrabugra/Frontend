<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul>
      <li>
        <router-link :to="{name: 'Post', params: {id: 1, title: 'My first post'}}">
          My first post
        </router-link>
      </li>

      <li>
        <router-link :to="{name: 'Post', params: {id: 2, title: 'My second post'}}">
          My second post
        </router-link>
      </li>

      <li>
        <router-link :to="{name: 'Post', params: {id: 3, title: 'My third post'}}">
          My third post
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {

    }
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
</style>