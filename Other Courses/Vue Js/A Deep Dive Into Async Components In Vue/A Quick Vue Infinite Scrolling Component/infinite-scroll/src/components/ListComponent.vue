<template>
  <div class="scrolling-component" ref="scrollComponent">
    <Post
        v-for="(post, index) in posts"
        :post="post"
        :key="index"
    />
  </div>
</template>

<script>
  import {ref, onMounted, onUnmounted} from "vue";
  import getPosts from "../composables/get-posts";
  import Post from "./Post.vue";


  export default {
    name: "ListComponent",
    components: {Post},
    setup() {
      // references
      const posts = ref(getPosts(10));
      const scrollComponent = ref(null);

      // methods
      const loadMorePosts = () => {
        let newPosts = getPosts(10);
        posts.value.push(...newPosts);
      };

      onMounted(() => {
        window.addEventListener("scroll", handleScroll)
      });

      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll)
      });

      const handleScroll = (e) => {
        let element = scrollComponent.value;
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
          loadMorePosts();
        }
      };

      return {posts, scrollComponent}
    }
  }
</script>

<style scoped>

</style>