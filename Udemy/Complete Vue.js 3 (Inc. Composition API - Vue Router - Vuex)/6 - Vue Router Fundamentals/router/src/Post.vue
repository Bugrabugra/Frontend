<template>
  <div v-if="post">
    <h4>{{post.title}}</h4>
    <p>{{post.content}}</p>
  </div>

</template>

<script>
  import {useRoute, useRouter} from "vue-router";
  import {testPosts} from "./data/testPosts";
  import {computed} from "vue";


  export default {
    name: "Post",
    beforeRouteEnter(to, from, next) {
      console.log("to: ", to, "from: ", from);
      next({name: "Posts"});
    },
    setup() {
      const route = useRoute();
      console.log(route);
      const post = computed(() => {
        return testPosts.find((post) => {
          return post.id === parseInt(route.params.id);
        })
      })
      return {
        post
      }
    }
  }
</script>

<style scoped>

</style>