<template>
  <div class="grid grid-rows-6 min-h-full gap-1">
    <!--unique values list-->
    <div class="row-span-5 h-0 min-h-full bg-white border border-gray-400 overflow-y-auto overflow-x-hidden">
      <ul>
        <li
            class="px-2 py-1 border border-gray-200 hover:bg-blue-100 transition duration-300 cursor-pointer"
            v-for="uniqueValue in uniqueValues"
        >
          {{uniqueValue.value}}
        </li>
      </ul>
    </div>

    <!--button and input-->
    <div class="row-span-1">
      <div class="grid grid-cols-6 gap-x-1 min-h-full">
        <button class="col-span-3 text-xs bg-gray-300 px-1 py-1 border border-gray-400 hover:border-blue-400 hover:bg-blue-100 transition duration-500">
          Get Unique Values
        </button>
        <div class="col-span-3 grid grid-cols-3 flex items-center justify-center">
          <label class="col-span-1 text-xs" for="input-unique-value">
            Go To:
          </label>
          <input class="col-span-2" type="text" id="input-unique-value">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "UniqueValue",
    setup() {
      // references
      const uniqueValues = ref([
        {value: 23735},
        {value: 3643},
        {value: 586485},
        {value: 23735},
        {value: 3643},
        {value: 586485},
        {value: 23735},
        {value: 3643},
        {value: 586485},
      ]);

      return {uniqueValues}
    }
  }
</script>

<style scoped>

</style>