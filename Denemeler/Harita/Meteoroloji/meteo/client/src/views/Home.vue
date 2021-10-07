<template>
  <router-link to="/">Home</router-link>
  <router-link v-if="user.is_admin" to="/admin">Admin</router-link>
  <button class="bg-red-500" @click="logout">Logout</button>
  <!--<Map/>-->
</template>

<script setup>
  import Map from "../components/Home/Map.vue";
  import {useStore} from "vuex";
  import {computed} from "vue";

  // store
  const store = useStore();

  // computed
  const user = computed(() => {
    return store.state.auth.userLoggedIn;
  });

  const logout = async () => {
    await store.dispatch("auth/logoutUser");
  };
</script>