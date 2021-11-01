<template>
  <Heading :level="1">
    TV Finder
  </Heading>
  <MyShows>
    <template #scopedSlot="{shows}">
      <h3 v-if="shows?.length > 0">
        Average Score {{computedAverage(shows).toFixed(2)}}
      </h3>
    </template>
  </MyShows>
</template>

<script setup>
  import Heading from "./components/Heading.vue";
  import MyShows from "./components/MyShows.vue";

  const computedAverage = shows => {
    return shows.reduce((acc, info) => +info.score + acc, 0) / shows.length;
  }
</script>

<style>
  #app {
    font-family: "Avenir LT Std", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
