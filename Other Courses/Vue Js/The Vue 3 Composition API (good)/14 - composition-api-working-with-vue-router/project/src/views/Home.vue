<template>
  <div>
    <router-link :to="{name: 'About'}">About</router-link>
  </div>
</template>

<script>
  import {useRouter} from "vue-router";

  export default {
    name: 'Home',

    setup(props, {root}) {
      const router = useRouter();

      router.replace({name: "About"})

      return {}
    }
  }
</script>
