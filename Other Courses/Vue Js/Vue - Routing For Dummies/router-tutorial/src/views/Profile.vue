<template>
  <div>
    <h3>My Profile</h3>
    <h4>{{route.params.id}}</h4>
    <router-link :to="{name: 'Profile', params: {id: 456}, query: {plan: 'private'}}">Another Route</router-link>
    <br>
    <router-link :to="{name: 'Info', params: {id: 3}}">Info</router-link>
    <h5>{{route.query}}</h5>
  </div>
</template>

<script setup>
  import {useRoute} from "vue-router";
  import {watch} from "vue";

  const route = useRoute();
  watch(route, (newRoute) => {
    console.log(newRoute);
  });
</script>

<style scoped>

</style>