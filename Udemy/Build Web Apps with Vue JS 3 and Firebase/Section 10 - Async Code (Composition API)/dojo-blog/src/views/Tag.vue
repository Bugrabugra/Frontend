<template>
  <div class="tag">
    <div v-if="error">{{error}}</div>
    <div v-if="posts.length">
      <PostList :posts="postsWithTag"/>
      <TagCloud :posts="posts"/>
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
</template>

<script>
  import getPosts from "../composables/getPosts";
  import PostList from "../components/PostList";
  import Spinner from "../components/Spinner";
  import {useRoute} from "vue-router";
  import {computed} from "vue";
  import TagCloud from "../components/TagCloud";


  export default {
    name: "Tag",
    components: {
      TagCloud,
      Spinner,
      PostList
    },
    setup() {
      const route = useRoute();
      const {posts, error, load} = getPosts();

      load();

      const postsWithTag = computed(() => {
        return posts.value.filter(p => {
          return p.tags.includes(route.params.tag)
        })
      })

      return {error, posts, postsWithTag}
    }
  }
</script>

<style scoped>

</style>