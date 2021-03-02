<template>
  <Suspense>
    <template #default>
      <h3>Lazy</h3>
      <Lazy/>
    </template>

    <template #fallback>
      <PulseLoader/>
    </template>
  </Suspense>
</template>

<script>
  import {defineAsyncComponent} from "vue";
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


  const Lazy = defineAsyncComponent(
    () => import("./components/Lazy")
  )


  export default {
    name: 'App',
    components: {
      Lazy,
      PulseLoader
    }
  }
</script>