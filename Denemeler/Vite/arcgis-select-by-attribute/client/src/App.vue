<template>
  <div class="min-h-screen bg-gray-500 flex items-center justify-center">
    <div class="w-3/5 h-80 bg-gray-200 shadow-xl">
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
        <!--layer-->
        <div class="grid grid-cols-6">
          <label class="col-span-1" for="select-layer">Layer:</label>
          <select name="select-layer" id="select-layer" class="col-span-5">
            <option value="mahalle">Mahalle</option>
            <option value="bina">Bina</option>
          </select>

          <div class="flex col-span-5 col-start-2 items-center">
            <input type="checkbox" id="check-selectable-layer">
            <label class="ml-1" for="check-selectable-layer">
              Only show selectable layers in list
            </label>
          </div>

          <label class="col-span-1" for="select-method">Method:</label>
          <select name="select-method" id="select-method" class="col-span-5">
            <option value="new">Create a new selection</option>
            <option value="add-current">Add to current selection</option>
            <option value="remove-current">Remove from current selection</option>
            <option value="select-from-current">Select from current selection</option>
          </select>





        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


 export default {
   setup() {
     // references
     const fields = ref([
       {name: "ObjectId", value: "OBJECTID"},
       {name: "İl no", value: "ABS_IL_NO"},
       {name: "İlçe no", value: "ABS_ILCE_NO"},
       {name: "Mahalle no", value: "ABS_MAHALLE_NO"},
       {name: "İl no", value: "ABS_IL_NO"},
       {name: "İlçe no", value: "ABS_ILCE_NO"},
       {name: "Mahalle no", value: "ABS_MAHALLE_NO"},
     ]);

     return {fields}
   }
 }
</script>

<style>

</style>
