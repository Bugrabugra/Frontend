<template>
  <div class="px-4">
    <h2 class="text-center text-xl text-gray-800 border-b border-gray-500 leading-loose w-full">
      <span class="">
        Fields to Show
      </span>
    </h2>

    <h2 class="text-center text-gray-100 bg-gray-400 px-2 mt-2 block rounded-lg">
      Drag and drop to change column ordering
    </h2>

    <!--tag list-->
    <div class="flex items-center justify-between mt-2 border border-gray-400 rounded">
      <div>
        <!--tags-->
        <div
            v-for="(field, index) in fields"
            :key="index"
            class="border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 px-1 mx-1 my-1 inline-flex items-center rounded cursor-pointer select-none"
        >
          {{field.name}}
          <button class="ml-1" @click="removeField(index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <button @click="resetFields">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!--sorters-->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
      <!--sort-1-->
      <div>
        <h2 class="text-center text-xl text-gray-800">
          Sort 1
        </h2>

        <!--buttons-->
        <div class="flex items-center space-x-4">
          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option v-for="field in fields" :value="field.value">
              {{field.name}}
            </option>
          </select>

          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </div>

      <!--sort-2-->
      <div>
        <h2 class="text-center text-xl text-gray-800">
          Sort 2
        </h2>

        <!--buttons-->
        <div class="flex items-center space-x-4">
          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option v-for="field in fields" :value="field.value">
              {{field.name}}
            </option>
          </select>

          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "FieldsToShow",
    setup() {
      // store
      const store = useStore();

      // references
      const fields = ref(store.state.fields.filter(field => {
        return field.value !== "tags";
      }));

      // methods
      const removeField = (index) => {
        fields.value = fields.value.filter(field => {
          return field !== fields.value[index];
        })
      };

      const resetFields = () => {
        fields.value = store.state.fields.filter(field => {
          return field.value !== "tags";
        });
      };

      return {fields, removeField, resetFields}
    }
  }
</script>