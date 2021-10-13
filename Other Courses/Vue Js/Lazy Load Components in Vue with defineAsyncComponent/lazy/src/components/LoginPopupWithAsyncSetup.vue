<template>
  <div class="popup">
    <div class="content">
      <p> Loaded API: {{ article }} </p>
      <h4> Login to your account </h4>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button> Log in </button>
    </div>
  </div>
</template>

<script>
  const getArticleInfo = async () => {
    // wait 3 seconds to mimic API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const article = {
      title: 'My Vue 3 Article',
      author: 'Matt Maribojoc'
    }
    return article
  }
  export default {
    async setup() {
      const article = await getArticleInfo()
      console.log(article)

      return {
        article
      }
    }
  }
</script>