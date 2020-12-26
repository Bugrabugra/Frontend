<template>
  <input type="text" :value="currentHashtag">

  <Card v-for="post in filteredPosts">
    <template v-slot:title>
      {{post.title}}
    </template>

    <template v-slot:content>
      {{post.content}}
    </template>

    <template v-slot:description>
      <Controls :post="post"/>
    </template>

  </Card>
  {{currentHashtag}}
</template>

<script>
  import {store} from "./composables/store";
  import Card from "./components/Card";
  import Controls from "./components/Controls";
  import {ref, computed} from "vue";

  export default {
    components: {
      Card,
      Controls
    },

    setup() {
      const setHashtag = (evt) => {
        console.log(evt.target.value);
        store.setHashtag(evt.target.value)
      }

      return {
        filteredPosts: store.filteredPosts,
        setHashtag,
        currentHashtag: computed(() => store.state.currentHashtag)
      }
    }
  }
</script>

<style>

</style>
