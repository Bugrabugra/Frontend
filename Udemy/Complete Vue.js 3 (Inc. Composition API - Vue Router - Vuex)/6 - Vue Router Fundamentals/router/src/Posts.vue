<template>
  <h4>Posts</h4>
  <router-link v-for="post in testPosts" :to="`/posts/${post.id}`">
    {{post.title}}
  </router-link>
  <router-view/>
</template>

<script>
  import {testPosts} from "./data/testPosts";
  import {useRoute, useRouter} from "vue-router";
  import {watchEffect} from "vue";

  export default {
    name: "Posts",
    setup() {
      const route = useRoute();
      watchEffect(() => {
        console.log(route.params);
      })
      return {
        testPosts
      }
    },
    // watch: {
    //   "$route": {
    //     handler: (val, oldVal) => {
    //       console.log(val)
    //     },
    //     immediate: true
    //   }
    // }
  }
</script>

<style scoped>

</style>