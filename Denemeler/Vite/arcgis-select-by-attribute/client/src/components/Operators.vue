<template>
  <div class="grid grid-cols-6 gap-2">
    <button
        class="bg-gray-300 px-1 py-1 border border-gray-400 hover:border-blue-400 hover:bg-blue-100 transition duration-500"
        v-for="operator in operators"
        :class="{'col-span-2': !operator.small, 'col-span-1': operator.small, 'px-0': operator.small}"
    >
      {{operator.value}}
    </button>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Operators",
    setup() {
      // references
      const operators = ref([
        {value: "="},
        {value: "<>"},
        {value: "Like"},
        {value: ">"},
        {value: ">="},
        {value: "And"},
        {value: "<"},
        {value: "<="},
        {value: "Or"},
        {value: "_", small: true},
        {value: "%", small: true},
        {value: "()"},
        {value: "Not"},
        {value: "Is"},
        {value: "In"},
        {value: "Null"}
      ]);

      return {operators}
    }
  }
</script>

<style scoped>

</style>