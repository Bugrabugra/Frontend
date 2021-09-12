<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="w-3/5 h-80 bg-gray-200 shadow-xl">
      <!--title-->
      <div class="flex justify-between items-center bg-teal-400">
        <p class="pl-4">Select by Attributes</p>
        <button class="px-2 py-2 hover:bg-red-600 transition duration-300 -pr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="px-4 py-2">
        <!--layer-->
        <div class="grid grid-cols-6">
          <p class="col-span-1">Layer:</p>
          <select class="col-span-5" name="select-layer" id="select-layer">

          </select>

          <div class="flex col-span-4 col-start-2 items-center">
            <input type="checkbox" id="check">
            <label class="" for="check">Only show selectable layers in list</label>
          </div>

          <p class="col-span-1 col-start-1">Method:</p>
          <select class="col-span-5" name="select-method" id="select-method">
            <option value="new">New</option>
          </select>

          <div class="grid grid-cols-6 gap-1">
            <button :class="{'col-span-1': d.small, 'col-span-2': !d.small}" class="bg-gray-300" v-for="d in data" :key="d.id" value="d.value">
              {{d.name}}
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "App",
    setup() {
      const data = ref([
        {id: 0, name: "0", value: "0"},
        {id: 1, name: "1", value: "1"},
        {id: 2, name: "2", value: "2"},
        {id: 3, name: "3", value: "3"},
        {id: 4, name: "4", value: "4"},
        {id: 5, name: "5", value: "5"},
        {id: 7, name: "6", value: "6", small: true},
        {id: 8, name: "7", value: "7", small: true},
        {id: 9, name: "8", value: "8"}
      ]);

      return {data}
    }
  }

</script>

<style>

</style>
