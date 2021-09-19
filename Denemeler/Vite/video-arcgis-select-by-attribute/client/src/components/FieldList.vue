<template>
  <div class="bg-white mt-2 h-32 border border-gray-400 overflow-scroll overflow-x-hidden">
    <ul>
      <li
          @click="highlight(field, index)"
          @dblclick="addToQuery(field)"
          v-for="(field, index) in fields"
          :key="index"
          class="px-2 py-1 select-none border border-gray-100 hover:bg-blue-100 transition duration-300 cursor-pointer"
          :class="{'bg-blue-400': index === indexClickedField}"
      >
        {{field}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {computed, ref} from "vue";


  export default {
    name: "FieldList",
    setup() {
      // store
      const store = useStore();

      // references
      const indexClickedField = ref(null);

      // computed
      const fields = computed(() => {
        return store.state.fields;
      });

      // methods
      const highlight = (field, index) => {
        indexClickedField.value = index;
        store.commit("setClickedField", field);
      };

      const addToQuery = (field) => {
        store.commit("updateQuery", field);
      };

      return {fields, indexClickedField, highlight, addToQuery}
    }
  }
</script>

<style scoped>

</style>