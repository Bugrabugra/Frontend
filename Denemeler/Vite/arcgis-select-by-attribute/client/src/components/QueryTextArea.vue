<template>
  <div class="">
    <textarea
        v-model="query"
        rows="4"
        class="w-full overflow-x-hidden overflow-y-scroll outline-none px-2 py-1 border border-gray-400"
        name="query"
        id="query"
    />
  </div>
</template>

<script>
  import {computed} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "QueryTextArea",
    setup() {
      // store
      const store = useStore();

      // computed
      const query = computed({
        get() {
          return store.state.query;
        },
        set(newQueryPart) {
          store.commit("setQuery", newQueryPart);
        }
      })


      return {query}
    }
  }
</script>

<style scoped>

</style>