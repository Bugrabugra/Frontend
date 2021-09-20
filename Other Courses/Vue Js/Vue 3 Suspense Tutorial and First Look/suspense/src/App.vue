<template>
  <div v-if="error">
    Error loading component {{error}}
  </div>
  <Suspense v-else>
    <template #default>
      <User/>
    </template>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
  import User from "./components/User.vue";
  import {ref, onErrorCaptured} from "vue";


  export default {
    components: {User},
    setup() {
      // references
      const error = ref(null);

      // onErrorCaptured
      onErrorCaptured(e => {
        error.value = e;
        return true;
      })

      return {error}
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
