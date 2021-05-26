<template>
  <BaseLayout
      :page-title="loadedMemory ? loadedMemory.title : 'Loading...'"
      page-default-back-link="/memories"
  >
    <h2 v-if="!loadedMemory">Could not find a memory for the given id.</h2>
    <MemoryOverview
        v-else
        :title="loadedMemory.title"
        :image="loadedMemory.image"
        :description="loadedMemory.description"
    />
  </BaseLayout>
</template>

<script>


  import MemoryOverview from "../components/memories/MemoryOverview";
  export default {
    name: "MemoryDetailsPage",

    components: {MemoryOverview},

    data() {
      return {
        memoryId: this.$route.params.id
      }
    },

    computed: {
      loadedMemory() {
        return this.$store.getters.memory(this.memoryId);
      }
    },

    // watch: {
    //   "$route"(currentRoute) {
    //     this.memoryId = currentRoute.params.id;
    //   }
    // }
  }
</script>

<style scoped>

</style>