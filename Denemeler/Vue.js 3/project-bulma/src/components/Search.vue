<template>
  <div class="columns is-centered">
    <div class="column is-4 mt-3">
      <input @input="search" v-model="text" class="input is-info is-narrow" type="text" placeholder="Search name">
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Search",

    setup(props, {emit}) {
      const text = ref("");

      const search = () => {
        emit("searchText", text.value);
      }

      return {text, search}
    }
  }
</script>

<style scoped>

</style>