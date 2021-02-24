<template>
  <div>
    <div class="like">
      <button @click="like">
        Like
      </button>

      <div>
        {{post.likes}}
      </div>
    </div>
    <Hashtag
        v-for="tag in post.hashtags"
        :hashtag="tag"
    >
    </Hashtag>
  </div>
</template>

<script>
  import Hashtag from "./Hashtag";
  import {store} from "../composables/store";


  export default {
    props: {
      post: {
        type: Object
      }
    },

    components: {Hashtag},

    setup(props) {
      const like = () => {
        store.incrementLike(props.post)
      }

      return {
        like
      }
    }

  }
</script>

<style scoped>
  .like {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
</style>
