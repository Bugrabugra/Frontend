<template>
  <div class="w-3/5 h-full bg-gray-100">
    <div>
      <!--header-->
      <div class="flex items-center justify-between px-2 py-3 border-b-2 border-gray-300">
        <h3 class="font-bold text-xl">Filters</h3>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!--content-->
      <FieldsToShow/>
      <FilterConditions class="mt-4"/>
      <Results class="mt-4"/>

      <!--footer-->
      <div class="flex items-center justify-end px-2 py-3 mt-4 border-t-2 border-gray-300">
        <button class="px-3 py-1 bg-gray-200 border-2 border-gray-300 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import FieldsToShow from "./FieldsToShow.vue";
  import FilterConditions from "./FilterConditions.vue";
  import Results from "./Results.vue";


  export default {
    name: "FiltersPage",
    components: {
      Results,
      FilterConditions,
      FieldsToShow
    },
  }
</script>

<style scoped>

</style>