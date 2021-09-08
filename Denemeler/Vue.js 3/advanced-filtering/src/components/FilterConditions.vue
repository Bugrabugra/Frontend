<template>
  <div class="px-4">
    <!--header-->
    <h2 class="text-center text-xl text-gray-800 border-b border-gray-500 leading-loose w-full">
      <span>
        Filter Conditions
      </span>
    </h2>

    <!--errors-->
    <div class="mt-2">
      <transition-group
          enter-from-class="opacity-0"
          enter-active-class="transition-all duration-300 ease-in-out"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-active-class="transition-all duration-300 ease-in-out"
          leave-to-class="opacity-0"
      >
        <!--errorNewFilter-->
        <div v-if="isErrorNewFilter" >
          <p class="text-center bg-red-400 text-red-100 rounded-md px-1 mt-1">
            You can not create another filter while having an uncompleted filter
          </p>
        </div>

        <!--errorFields-->
        <div v-if="isErrorFields">
          <p class="text-center bg-red-400 text-red-100 rounded-md px-1 mt-1">
            You must fill field, condition and values
          </p>
        </div>
      </transition-group>
    </div>

    <!--filter conditions-->
    <div class="mt-2">
      <!--filter-->
      <div class="flex-col space-y-2">
        <transition-group
            enter-from-class="opacity-0"
            enter-active-class="transition-all duration-300 ease-in-out"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition-all duration-300 ease-in-out"
            leave-to-class="opacity-0"
        >
          <div
              v-if="filters.length > 0"
              v-for="(filter, index) in filters"
              :key="index"
              class="flex items-center justify-between bg-gray-200 rounded"
          >
            <Filters
                :filter="filter"
                :indexFilter="index"
                @errorNewFilter="errorNewFilter"
                @errorFields="errorFields"
            />

            <!--remove filter button-->
            <button @click="removeFilter(index)" class="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </transition-group>
      </div>

      <!--add filter button-->
      <div v-if="filters.length === 0" class="flex items-center justify-center">
        <button
            @click="addNewFilter"
            class="flex items-center px-2 py-1 bg-gray-400 text-gray-200 rounded hover:bg-gray-300 hover:text-gray-500 transition duration-300"
        >
          <span class="inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </span>

          <span>Add Filter</span>
        </button>
      </div>
    </div>

    <!--filter button-->
    <button
        v-if="filters.length > 0"
        @click="filterQueries"
        class="flex items-center mt-4 px-2 py-1 bg-gray-400 text-gray-200 rounded hover:bg-gray-300 hover:text-gray-500 transition duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Filter
    </button>
  </div>
</template>

<script>
  import TagList from "./TagList.vue";
  import Filters from "./Filters.vue";
  import {useStore} from "vuex";
  import {ref, computed} from "vue";


  export default {
    name: "FilterConditions",
    components: {
      Filters,
      TagList
    },
    setup() {
      // store
      const store = useStore();

      // references
      const isErrorNewFilter = ref(false);
      const isErrorFields = ref(false);

      // computed
      const filters = computed(() => {
        return store.state.filters;
      });

      // methods
      const addNewFilter = () => {
        store.commit("addNewFilter", "");
      };

      const removeFilter = (index) => {
        store.commit("removeFilter", index);
      };

      const filterQueries = () => {
        store.commit("setFilter");
        store.dispatch("filterQueries");
      };

      const errorNewFilter = () => {
        isErrorNewFilter.value = true;
        setTimeout(() => {
          isErrorNewFilter.value = false;
        }, 4000)
      }

      const errorFields = () => {
        isErrorFields.value = true;
        setTimeout(() => {
          isErrorFields.value = false;
        }, 4000)
      };

      return {filters, addNewFilter, removeFilter, filterQueries, errorNewFilter, errorFields, isErrorNewFilter, isErrorFields}
    }
  }
</script>