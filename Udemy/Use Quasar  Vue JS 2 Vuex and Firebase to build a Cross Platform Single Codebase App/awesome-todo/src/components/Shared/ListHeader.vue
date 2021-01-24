<template>
  <q-banner
    :class="bgColor"
    class="text-white text-center list-header"
    dense
  >
    <span class="text-bold text-subtitle1"><slot></slot></span>
  </q-banner>
</template>

<script>
  export default {
    name: "ListHeader",

    props: ["bgColor"]
  }
</script>

<style scoped>
  .list-header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>
