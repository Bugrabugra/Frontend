<template>
  <Error v-if="error"/>
  <div class="z-10 min-h-screen bg-gray-500 flex items-center justify-center">
    <div class="flex w-2/3 justify-center items-center space-x-10 relative">
      <!--select component-->
      <div class="w-1/3 bg-gray-200 shadow-xl rounded-lg">
        <!--title-->
        <div class="flex justify-between items-center bg-teal-400 rounded-t-lg">
          <p class="pl-4">Select by Attributes</p>
          <button class="px-2 py-2 hover:bg-red-500 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!--main-->
        <div class="px-4 py-2">
          <div class="grid grid-cols-6 mt-2 gap-y-2">
            <!--layer combobox-->
            <label for="select-layer" id="select-layer" class="col-span-1">Layer:</label>
            <select
                @change="setLayer"
                id="select-layer"
                class="col-span-5 border border-gray-400 hover:bg-blue-100 transition duration-500"
                v-model="selectedLayer"
            >
              <option
                  v-for="(layer, index) in layers"
                  :key="index"
                  :value="layer.value"
              >
                {{layer.name}}
              </option>
            </select>

            <!--checkbox-->
            <div class="flex col-span-5 col-start-2 items-center">
              <input type="checkbox" id="check-selectable-layer">
              <label class="ml-1" for="check-selectable-layer">
                Only show selectable layers in this list
              </label>
            </div>

            <!--method combobox-->
            <label for="select-method" id="select-method" class="col-span-1">
              Method:
            </label>
            <select
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
              <p>SELECT * FROM {{truncatedSelectedLayer}} WHERE</p>
            </div>

            <!--query-->
            <div class="col-span-6">
              <QueryTextArea/>
            </div>

            <!--query menu button-->
            <div class="col-span-6 flex space-x-2 border-b border-gray-400 -mt-2 pb-3">
              <!--TODO clear-->
              <button @click="clearQuery" class="button flex-1 py-0">Clear</button>
              <button class="button flex-1 py-0">Verify</button>
              <button class="button flex-1 py-0">Help</button>
              <button class="button flex-1 py-0">Load...</button>
              <button class="button flex-1 py-0 ">Save...</button>
            </div>

            <!--command button-->
            <div class="col-span-6 flex justify-end space-x-3 pt-1">
              <button class="button w-20">OK</button>
              <button @click="queryLayer" class="button w-20">Apply</button>
              <button class="button w-20">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!--map-->
      <div class="z-10 w-2/3 bg-gray-200 shadow-xl">
        <Map class="absolute top-0 bottom-0 right-0 w-2/3 rounded-lg"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {ref, computed} from "vue";
  import FieldList from "../components/FieldList.vue";
  import QueryTextArea from "../components/QueryTextArea.vue";
  import Operators from "../components/Operators.vue";
  import UniqueValues from "../components/UniqueValues.vue";
  import Error from "../components/Error.vue";
  import Map from "../components/Map.vue";


  export default {
    name: "Home",
    components: {
      Map,
      Error,
      UniqueValues,
      Operators,
      QueryTextArea,
      FieldList
    },
    setup() {
      // store
      const store = useStore();

      // references
      const selectedLayer = ref(null);
      const layers = computed(() => {
        return store.state.layers;
      });

      // computed
      const truncatedSelectedLayer = computed(() => {
        if (selectedLayer.value && selectedLayer.value.length > 30) {
          return selectedLayer.value.substring(0, 18) + "...";
        } else {
          return selectedLayer.value;
        }
      });

      const error = computed(() => {
        return store.state.error;
      });

      // methods
      const setLayer = () => {
        store.commit("setLayer", selectedLayer.value);
        store.dispatch("getFields");
      };

      const clearQuery = () => {
        store.commit("setQuery", "");
      };

      const queryLayer = () => {
        store.dispatch("query");
      }

      return {selectedLayer, layers, setLayer, truncatedSelectedLayer, clearQuery, queryLayer, error}
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