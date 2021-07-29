<template>
  <router-view/>
</template>

<script>
  import {useRoute, useRouter} from "vue-router";
  import {onBeforeMount} from "vue";
  import firebase from "firebase";


  export default {
    setup() {
      const router = useRouter();
      const route = useRoute();

      onBeforeMount(() => {
        firebase.auth().onAuthStateChanged(user => {
          if (!user) {
            router.replace("/login");
          } else if (route.path === "/login" || route.path === "/register") {
            router.replace("/");
          }
        })
      })

      return {}
    }
  }
</script>

<style lang="scss">
  body {
    background: #2c3e50;
    color: #fff;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  a {
    color: inherit;
  }
</style>
