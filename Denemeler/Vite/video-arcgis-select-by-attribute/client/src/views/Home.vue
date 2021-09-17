<template>
  <div class="z-10 min-h-screen bg-gray-500 flex items-center justify-center">
    <div class="flex w-2/3 justify-center items-center">
      <!--select component-->
      <!--TODO w-1/3-->
      <div class="bg-gray-200 shadow-xl rounded-lg">
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
            <!--TODO @change v-model-->
            <select
                id="select-layer"
                class="col-span-5 border border-gray-400 hover:bg-blue-100 transition duration-500"
                v-model="selectedLayer"
            >
              <!--TODO option-->
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

            </div>

            <!--operators-->
            <div class="col-span-2">

            </div>

            <!--unique values-->
            <div class="col-span-4 ml-2">

            </div>

            <!--query text-->
            <div class="col-span-6">
              <!--TODO layer name-->
              <p>SELECT * FROM BINA WHERE</p>
            </div>

            <!--query-->
            <div class="col-span-6">

            </div>

            <!--query menu button-->
            <div class="col-span-6 flex space-x-2 border-b border-gray-400 -mt-2 pb-3">
              <!--TODO clear-->
              <button class="button flex-1 py-0">Clear</button>
              <button class="button flex-1 py-0">Verify</button>
              <button class="button flex-1 py-0">Help</button>
              <button class="button flex-1 py-0">Load...</button>
              <button class="button flex-1 py-0 ">Save...</button>
            </div>

            <!--command button-->
            <div class="col-span-6 flex justify-end space-x-3 pt-1">
              <button class="button w-20">OK</button>
            <!--TODO @click-->
              <button class="button w-20">Apply</button>
              <button class="button w-20">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!--map-->
      <!--TODO map-->
    </div>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {ref, computed} from "vue";


  export default {
    name: "Home",
    setup() {
      // store
      const store = useStore();

      // references
      const selectedLayer = ref(null);
      const layers = computed(() => {
        return store.state.layers;
      })

      // computed

      // methods

      return {selectedLayer, layers}
    }
  }
</script>

<style>

</style>