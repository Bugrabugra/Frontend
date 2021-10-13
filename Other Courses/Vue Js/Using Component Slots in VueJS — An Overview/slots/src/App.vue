<template>
  <div>
    <MyButton>Click me!</MyButton>

    <BoxElement>
      <template v-slot:header="articleInfo">
        {{articleInfo.article.title}}
      </template>

      <template v-slot:content>
        This will be the content of the element
      </template>
    </BoxElement>
  </div>
</template>

<script setup>
  import MyButton from "./components/MyButton.vue";
  import BoxElement from "./components/BoxElement.vue";
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
