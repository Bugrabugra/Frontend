<template>
  <div class="py-3">
    <div class="mx-auto max-w-screen-lg">
      <h1 class="text-3xl text-center">{{quote.author}}</h1>
      <p class="my-5 text-2xl text-center text-gray-500">{{quote.content}}</p>
    </div>
  </div>
</template>

<script>
  import {useRoute} from "vue-router";
  import {useStore} from "vuex";
  import {ref, onMounted} from "vue";


  export default {
    name: "Quote",
    setup() {
      const route = useRoute();
      const store = useStore();
      const quote = ref({});

      onMounted(() => {
        setTimeout(() => {
          quote.value = store.getters.getSpecificQuote(route.params.id)
        }, 500)
      })

      return {quote}
    }
  }
</script>

<style scoped>

</style>