<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/dumbbell-light.png" alt="">
        <h1 class="text-lg">Active Tracker</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{name: 'Home'}">Home</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{name: 'Create'}">Create</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{name: 'Login'}">Login</router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  import {supabase} from "@/supabase/init";
  import store from "../store/index";
  import {useRouter} from "vue-router";
  import {computed} from "vue";


  // Get user from store
  const user = computed(() => {
    return store.state.user;
  });

  // Setup ref to router
  const router = useRouter();

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    await router.push({name: "Home"});
  };

</script>
