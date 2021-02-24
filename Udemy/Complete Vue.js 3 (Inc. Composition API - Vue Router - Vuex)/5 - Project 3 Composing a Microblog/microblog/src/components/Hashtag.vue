<template>
  <div class="hashtag" @click="setHashtag">
    #{{hashtag}}
  </div>
</template>

<script>
  import {store} from "../composables/store";


  export default {
    name: "Hashtag",

    props: {
      hashtag: {
        type: String
      }
    },

    setup(props, context) {
      const setHashtag = () => {
        store.setHashtag(props.hashtag)
      }

      return {
        setHashtag
      }
    }
  }
</script>

<style scoped>
  .hashtag {
    text-decoration: underline;
  }

  .hashtag:hover {
    color: cornflowerblue;
  }
</style>
