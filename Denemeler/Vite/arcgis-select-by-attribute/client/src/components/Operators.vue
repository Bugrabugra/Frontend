<template>
  <div class="grid grid-cols-6 gap-2">
    <button
        @click="addToQuery(operator.value)"
        class="button"
        v-for="operator in operators"
        :class="{'col-span-2': !operator.small, 'col-span-1': operator.small, 'px-0': operator.small}"
    >
      {{operator.value}}
    </button>
  </div>
</template>

<script>
  import {ref} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "Operators",
    setup() {
      // store
      const store = useStore();

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

      // methods
      const addToQuery = (operator) => {
        store.commit("updateQuery", operator);
      }

      return {operators, addToQuery}
    }
  }
</script>

<style scoped>

</style>