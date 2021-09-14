<template>
  <div class="bg-white mt-2 h-32 border border-gray-400 overflow-scroll overflow-x-hidden">
    <ul>
      <li
          @click="highlight(field, index)"
          @dblclick="addToQuery(field, index)"
          class="px-2 py-1 select-none border border-gray-100 hover:bg-blue-100 transition duration-300 cursor-pointer"
          v-for="(field, index) in fields"
          :class="{'bg-blue-400': index === clickedField}"
      >
        {{field}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {ref, computed} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "FieldList",
    setup() {
      // store
      const store = useStore();

      // references
      const clickedField = ref(null);

      // computed
      const fields = computed(() => {
        return store.state.fields;
      });

      // methods
      const addToQuery = (field) => {
        store.commit("updateQuery", field);
      };

      const highlight = (field, index) => {
        clickedField.value = index;
        store.commit("setClickedField", field)
      };

      return {fields, clickedField, highlight, addToQuery}
    }
  }
</script>