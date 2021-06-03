<template>
  <section id="about-page" v-editable="blok">
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </section>
</template>

<script>
  export default {
    name: "index",

    asyncData(context) {
      return context.app.$storyapi
        .get("cdn/stories/about", {
          version: "draft"
        })
        .then(res => {
          return {
            blok: res.data.story.content,
            title: res.data.story.content.title,
            content: res.data.story.content.content
          }
        })
    }
  }
</script>

<style scoped>
  #about-page {
    width: 80%;
    max-width: 500px;
    margin: auto;
  }

  #about-page p {
    white-space: pre-line;
  }
</style>
