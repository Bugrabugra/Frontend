<template>
  <Suspense>
    <template #default>
      <ProfileCard/>
    </template>

    <template #fallback>
      <ProfileCardSkeleton/>
    </template>
  </Suspense>
</template>

<script setup>
  import ProfileCard from "./components/ProfileCard.vue";
  import ProfileCardSkeleton from "./components/ProfileCardSkeleton.vue";
</script>

<style>
  html, body {
    background-color: #8d7a88;
  }
  #app {
    font-family: Avenir, Helvetica, sans-serif;
  }
</style>