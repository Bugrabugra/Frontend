<template>
  <Map/>
  <router-link to="/">Home</router-link>
  <router-link to="/admin">Admin</router-link>
  <button @click="logout">Logout</button>
</template>

<script setup>
  import Map from "../components/Home/Map.vue";
  import {useStore} from "vuex";

  // store
  const store = useStore();

  const logout = async () => {
    await store.dispatch("auth/logoutUser");
  };
</script>