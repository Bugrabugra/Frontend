<template>
  <div v-if="errorMsg">
    {{errorMsg}}
  </div>
  <Suspense v-else>
    <template #default>
      <ArticleInfo/>
    </template>

    <template #fallback>
      Loading article
    </template>
  </Suspense>
</template>

<script>
  import ArticleInfo from "./ArticleInfo.vue";
  import {ref, onErrorCaptured} from "vue";


  export default {
    name: "ArticlePost",
    components: {ArticleInfo},
    setup() {
      const errorMsg = ref(null);
      onErrorCaptured(() => {
        errorMsg.value = "Something went wrong"
      });

      return {errorMsg}
    }
  }
</script>

<style scoped>

</style>