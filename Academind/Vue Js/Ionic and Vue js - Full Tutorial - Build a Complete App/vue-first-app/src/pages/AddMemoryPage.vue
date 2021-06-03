<template>
  <BaseLayout
      page-title="Add a Memory"
      page-default-back-link="/memories"
  >
    <CreateMemoryForm @save-memory="saveMemory"/>
  </BaseLayout>
</template>

<script>
  import CreateMemoryForm from "../components/memories/CreateMemoryForm";


  export default {
    name: "AddMemoryPage",

    components: {CreateMemoryForm},

    data() {
      return {}
    },

    methods: {
      saveMemory(memoryData) {
        this.$store.dispatch("addMemory", memoryData);
        this.$router.replace("/memories"); // Replace: no turn back, Push: with turn back
      }
    }
  }
</script>

<style scoped>

</style>