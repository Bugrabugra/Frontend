<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{currentBlog[0].blogTitle}}</h2>
      <h4>Posted on: {{new Date(currentBlog[0].blogDate).toLocaleString("en-us", {dateStyle: "long"})}}</h4>
      <img :src="currentBlog[0].blogCoverPhoto" alt="">
      <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML">
      </div>
    </div>
  </div>
</template>

<script>
  import {ref, onMounted} from "vue";
  import {useStore} from "vuex";
  import {useRoute} from "vue-router";


  export default {
    name: "ViewBlog",
    setup() {
      // Store
      const store = useStore();

      // Route
      const route = useRoute();

      // References
      const currentBlog = ref(null);

      // Mounted
      onMounted(async () => {
        currentBlog.value = await store.state.blogPosts.filter(post => {
          console.log(post)
          return post.blogID === route.params.blogId;
        })
      });

      return {currentBlog}
    }
  }
</script>

<style lang="scss">
  .post-view {
    h4 {
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 24px;
    }
  }
</style>