<template>
  <div class="bg-white mt-2 h-32 border border-gray-400 overflow-scroll overflow-x-hidden">
    <ul>
      <li
          @click="addToQuery(field.value)"
          class="px-2 py-1 border border-gray-100 hover:bg-blue-100 transition duration-300 cursor-pointer"
          v-for="field in fields"
      >
        {{field.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {ref} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "FieldList",
    setup() {
      // store
      const store = useStore();

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

      // methods
      const addToQuery = (field) => {
        store.commit("updateQuery", field);
      }

      return {fields, addToQuery}
    }
  }
</script>