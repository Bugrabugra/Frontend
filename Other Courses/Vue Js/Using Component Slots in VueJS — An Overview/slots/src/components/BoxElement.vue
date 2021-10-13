<template>
  <div>
    <slot name="header" :article="article">
      {{article.title}}
    </slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: "BoxElement",
    data() {
      return {
        article: {
          title: "Buğra"
        }
      }
    }
  }
</script>

<style scoped>

</style>