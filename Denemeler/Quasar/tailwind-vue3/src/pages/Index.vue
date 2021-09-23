<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <p class="font-bold text-indigo-400">Test</p>
    <button class="bg-red-400 hover:bg-red-800 px-2">Test</button>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';


  export default defineComponent({
    name: 'PageIndex'
  })
</script>
