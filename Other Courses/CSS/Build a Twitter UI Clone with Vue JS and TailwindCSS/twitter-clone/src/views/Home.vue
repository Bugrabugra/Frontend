<template>
  <div class="home">
    <Tweet
        v-for="tweet in tweets"
        :key="tweet._id"
        :tweet="tweet"
    />
  </div>
</template>

<script>
  import {ref} from "vue";
  import vweets from "../vweets";
  import Tweet from "../components/Tweet";


  export default {
    name: 'Home',
    components: {Tweet},
    setup() {
      const tweets = ref(vweets);

      return {tweets}
    }
  }
</script>
