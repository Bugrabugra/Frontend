<template>
  <button v-for="post in posts" @click="fetchPostData(post.id)">
    {{post.title}}
  </button>
  <div v-if="currentPost">
    <h1>{{currentPost.title}}</h1>
    <p>{{currentPost.content}}</p>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {computed} from "vue";


  export default {
    setup() {
      const store = useStore();
      const fetchPostData = (id) => {
        store.dispatch("posts/fetchDataFromServer", id)
      }
      const currentPost = computed(() => {
        return store.state.posts.currentPost;
      })

      return {
        fetchPostData,
        currentPost,
        posts: [
          {id: 1, title: "Post #1"},
          {id: 2, title: "Post #2"}
        ]
      }
    },

    name: 'App',

    computed: {
      currentPost() {
        return this.$store.state.posts.currentPost;
      }
    },
}
</script>

<style>

</style>
