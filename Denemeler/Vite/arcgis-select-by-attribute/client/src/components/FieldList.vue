<template>
  <div class="bg-white col-span-6 mt-2 h-32 overflow-scroll overflow-x-hidden">
    <ul>
      <li class="px-2 py-1 border border-gray-100 hover:bg-blue-100 transition duration-300 cursor-pointer" v-for="field in fields">
        {{field.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "FieldList",

  }
</script>