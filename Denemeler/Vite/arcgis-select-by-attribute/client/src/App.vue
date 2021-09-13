<template>
  <div class="min-h-screen bg-gray-500 flex items-center justify-center">
    <div class="w-3/5 bg-gray-200 shadow-xl">
      <!--title-->
      <div class="flex justify-between items-center bg-teal-400">
        <p class="pl-4">Select by Attributes</p>
        <button class="px-2 py-2 hover:bg-red-500 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!--main div-->
      <div class="px-4 py-2">
        <div class="grid grid-cols-6 mt-2 gap-y-2">
          <!--layer combo-->
          <label class="col-span-1" for="select-layer">Layer:</label>
          <select
              v-model="selectedLayer"
              name="select-layer"
              id="select-layer"
              class="col-span-5 border border-gray-400 hover:bg-blue-100 transition duration-500"
          >
            <option
                v-for="layer in layers"
                :key="layer.value"
                :value="layer.value"
            >
              {{layer.name}}
            </option>
          </select>

          <!--checkbox-->
          <div class="flex col-span-5 col-start-2 items-center">
            <input type="checkbox" id="check-selectable-layer">
            <label class="ml-1" for="check-selectable-layer">
              Only show selectable layers in list
            </label>
          </div>

          <!--method-->
          <label class="col-span-1" for="select-method">Method:</label>
          <select
              name="select-method"
              id="select-method"
              class="col-span-5 border border-gray-400 hover:bg-blue-100 transition duration-500"
          >
            <option value="new">Create a new selection</option>
            <option value="add-current">Add to current selection</option>
            <option value="remove-current">Remove from current selection</option>
            <option value="select-from-current">Select from current selection</option>
          </select>

          <!--field list-->
          <div class="col-span-6">
            <FieldList/>
          </div>

          <!--operators-->
          <div class="col-span-2">
            <Operators/>
          </div>

          <!--unique values-->
          <div class="col-span-4 ml-2">
            <UniqueValues/>
          </div>

          <!--query text-->
          <div class="col-span-6">
            <p>SELECT * FROM {{truncatedSelectedLayer}} WHERE:</p>
          </div>

          <!--query-->
          <div class="col-span-6">
            <QueryTextArea/>
          </div>

          <!--query menu buttons-->
          <div class="col-span-6 flex space-x-2 border-b border-gray-400 -mt-2 pb-3">
            <button @click="clearQuery" class="button flex-1 py-0">Clear</button>
            <button class="button flex-1 py-0">Verify</button>
            <button class="button flex-1 py-0">Help</button>
            <button class="button flex-1 py-0">Load...</button>
            <button class="button flex-1 py-0">Save...</button>
          </div>

          <!--command buttons-->
          <div class="col-span-6 flex justify-end space-x-3 pt-1">
            <button class="button w-20">OK</button>
            <button class="button w-20">Apply</button>
            <button class="button w-20">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FieldList from "./components/FieldList.vue";
  import Operators from "./components/Operators.vue";
  import UniqueValues from "./components/UniqueValues.vue";
  import QueryTextArea from "./components/QueryTextArea.vue";
  import {ref, computed} from "vue";
  import {useStore} from "vuex";


 export default {
   components: {
     QueryTextArea,
     UniqueValues,
     Operators,
     FieldList
   },
   setup() {
     // store
     const store = useStore();

     // computed
     const truncatedSelectedLayer = computed(() => {
       if (selectedLayer.value && selectedLayer.value.length > 30) {
         return selectedLayer.value.substring(0, 18) + "...";
       } else {
         return selectedLayer.value;
       }
     });

     // references
     const selectedLayer = ref(null);
     const layers = ref([
       {name: "Mahalle", value: "ABS_MAHALLE_Mmmjfhfmmmmmmmmmmmmmmmmmmmm"},
       {name: "Bina", value: "ABS_BINA_M"}
     ]);

     // methods
     const clearQuery = () => {
       store.commit("setQuery", "");
     };

     return {layers, selectedLayer, truncatedSelectedLayer, clearQuery}
   }
 }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
