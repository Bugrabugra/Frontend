<template>
  <div class="border-t border-gray-200 mt-10 mb-6">
    <div class="flex justify-between items-center mt-10">
      <!--Icons header-->
      <h2 class="text-2xl font-semibold">Icons</h2>

      <!--Search bar-->
      <input
          type="text"
          placeholder="Start typing to filter..."
          class="px-3 py-2 border border-gray-300 rounded"
          v-model="searchString"
          @input="search"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "Icons",
    data() {
      return {
        searchString: ""
      }
    },
    methods: {
      search() {
        this.$emit("search", this.searchString);
      }
    }
  }
</script>