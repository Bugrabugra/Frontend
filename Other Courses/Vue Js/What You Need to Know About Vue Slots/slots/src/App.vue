<template>
  <CaptionedContent>
    <template #content>
      <img src="https://via.placeholder.com/320x240">
    </template>
    <template #caption>
      Source: <a href="https://learnvue.co">learnvue.co</a>
    </template>
  </CaptionedContent>

  <CaptionedContent>
    <template #content>
      <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/xOyIxHA0tNY"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
      />
    </template>
    <template #caption="{source}">
      Source: <a href="https://learnvue.co">{{source}}</a>
    </template>
  </CaptionedContent>
</template>

<script setup>
  import CaptionedContent from "./components/CaptionedContent.vue";
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
