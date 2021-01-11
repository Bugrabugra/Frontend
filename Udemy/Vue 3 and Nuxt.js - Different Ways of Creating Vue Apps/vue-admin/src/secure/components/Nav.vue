<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>

    <ul class="navbar-nav px-3">
      <li>
        <router-link to="/profile" class="p-2 text-white">{{user.name}}</router-link>
        <a class="p-2 text-white" href="javascript:void(0)" @click="logout">Sign out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {useRouter} from "vue-router";
  import {useStore} from "vuex";
  import {computed} from "vue";
  import axios from "axios";


  export default {
    name: "Nav",

    setup() {
      const router = useRouter();
      const store = useStore();

      const user = computed(() => {
        return store.state.User.user;
      })

      const logout = async () => {
        await axios.post("logout", {})
        router.push("/login");
      }

      return {
        logout,
        user
      }
    }
  }
</script>