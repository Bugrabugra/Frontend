<template>
  {{article}}
</template>

<script>
  const getArticleInfo = async () => {
    // wait 3 seconds to mimic API call
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    const article = {
      title: "My Vue 3 Article",
      author: "Matt Daemon"
    }
    return article;
  };

  export default {
    name: "ArticleInfo",
    async setup() {
      const article = await getArticleInfo();

      return {article}
    }
  }
</script>

<style scoped>

</style>