<template>
  <div>
    {{postId}}
    <a href="#" @click.prevent="nextPost">Next post</a>
  </div>
</template>

<script>
  import {ref, computed} from "vue";
  import {useRouter, useRoute} from "vue-router"


  export default {
    name: 'Home',

    props: {
      id: {
        require: true
      }
    },

    setup(props) {
      const route = useRoute();
      const router = useRouter();
      const postId = computed(() => {
        return parseInt(props.id);
      })

      const nextPost = () => {
        router.push({params: {id: postId.value + 1}})
      }

      return {postId, nextPost}
    }
  }
</script>
