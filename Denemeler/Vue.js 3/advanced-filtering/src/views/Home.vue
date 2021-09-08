<template>
  <div class="min-h-screen bg-gray-800 flex justify-center items-center">
    <FiltersPage/>
  </div>
</template>

<script>
  import FiltersPage from "../components/FiltersPage.vue";


  export default {
    name: "Home",
    components: {
      FiltersPage,
    },
  }
</script>