<template>
  <div class="flex px-2 py-2 space-x-3">
    <!--select field-->
    <select
        :value="filter.selectedField ? filter.selectedField : selectedField"
        @input="selectedField = $event.target.value"
        class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-gray-100 border border-gray-400"
    >
      <option v-for="(field, index) in fields" :key="index" :value="field.value">
        {{field.name}}
      </option>
    </select>

    <!--select condition-->
    <select
        :value="filter.selectedCondition ? filter.selectedCondition : selectedCondition"
        @input="selectedCondition = $event.target.value"
        class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-gray-100 border border-gray-400"
    >
      <option
          v-if="['countFloor', 'countRoom', 'numberFloor'].includes(filter.selectedField)"
          v-for="(condition, index) in filtersStructure.conditions.number"
          :key="index"
          :value="condition.value"
      >
        {{condition.name}}
      </option>

      <option
          v-if="filter.selectedField === 'estateType'"
          v-for="(condition, index) in filtersStructure.conditions.string"
          :key="index"
          :value="condition.value"
      >
        {{condition.name}}
      </option>

      <option
          v-if="filter.selectedField === 'tags'"
          v-for="(condition, index) in filtersStructure.conditions.array"
          :key="index"
          :value="condition.value"
      >
        {{condition.name}}
      </option>

      <option
          v-if="filter.selectedField === 'dateBuilding'"
          v-for="(condition, index) in filtersStructure.conditions.date"
          :key="index"
          :value="condition.value"
      >
        {{condition.name}}
      </option>
    </select>

    <!--VALUES-->
    <!--tag list-->
    <TagList v-if="filter.selectedField === 'tags'" @tagListChanged="updateTagList" class="w-full"/>

    <!--text input-->
    <select
        v-if="filter.selectedField === 'estateType'"
        :value="filter.selectedValue ? filter.selectedValue : selectedValue"
        @input="selectedValue = $event.target.value"
        class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-gray-100 border border-gray-400"
    >
      <option value="for-sale">For Sale</option>
      <option value="for-rent">For Rent</option>
    </select>

    <!--number input-->
    <input
        type="number"
        v-if="['countFloor', 'countRoom', 'numberFloor'].includes(filter.selectedField)"
        :value="filter.selectedValue ? filter.selectedValue : selectedValue"
        @input="selectedValue = $event.target.value"
        class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-gray-100 border border-gray-400"
    />

    <!--date input-->
    <input
        type="date"
        v-if="filter.selectedField === 'dateBuilding'"
        :value="filter.selectedValue ? filter.selectedValue : selectedValue"
        @input="selectedValue = $event.target.value"
        class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-gray-100 border border-gray-400"
    />

    <!--and or-->
    <div class="flex items-center justify-center text-gray-500 text-xs">
      <button @click="addNewFilter" class="uppercase px-2 py-1 hover:bg-gray-300 transition duration-300 rounded">And</button>
      <!--<p class="text-gray-400 mx-1">|</p>-->
      <!--TODO complete "OR"-->
      <!--<button class="uppercase px-2 py-1 hover:bg-gray-300 transition duration-300 rounded">Or</button>-->
    </div>
  </div>
</template>

<script>
  import TagList from "./TagList.vue";
  import {ref, computed, watch} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "Filters",
    components: {TagList},
    props: ["filter", "indexFilter"],
    setup(props, {emit}) {
      // store
      const store = useStore();

      // references
      const fields = ref(store.state.fields);
      const selectedField = ref(null);
      const selectedCondition = ref(null);
      const selectedValue = ref(null);
      const filtersStructure = ref({
        fields: {
          countFloor: "number",
          countRoom: "number",
          estateType: "string",
          dateBuilding: "date",
          numberFloor: "number",
          tags: "array"
        },
        conditions: {
          number: [
            {value: ">", name: "is greater than"},
            {value: "<", name: "is less than"},
            {value: ">=", name: "is equal or greater than"},
            {value: "<=", name: "is equal or less than"},
            {value: "=", name: "is equal to"},
            {value: "!=", name: "is not equal to"},
          ],
          string: [
            {value: "=", name: "is"},
            {value: "!=", name: "is not"},
          ],
          date: [
            {value: ">", name: "is newer than"},
            {value: "<", name: "is older than"},
          ],
          array: [
            {value: "=", name: "has tags"},
            {value: "!=", name: "does not have tags"}
          ]
        }
      });

      // computed
      const compSelectedValue = computed({
        get() {
          return selectedValue.value;
        },
        set(val) {
          selectedValue.value = val;
        }
      });

      // methods
      const updateTagList = (e) => {
        const tagList = Object.values(e).join(",");
        compSelectedValue.value = tagList;
      };

      const addNewFilter = () => {
        if (selectedValue.value && selectedCondition.value && compSelectedValue.value) {
          if (!store.state.filters.some(filter => Object.values(filter).includes(null))) {
            store.commit("addNewFilter", "");
          } else {
            emit("errorNewFilter");
          }
        } else {
          emit("errorFields");
        }
      };

      // watch
      watch(
        [selectedField, selectedCondition, compSelectedValue],
        ([newSelectedField, newSelectedCondition, newSelectedValue]) => {
          store.commit("updateFilter", {
            indexFilter: props.indexFilter,
            filter: {
              selectedField: newSelectedField,
              selectedCondition: newSelectedCondition,
              selectedValue: newSelectedValue
            }
          })
        });

      return {fields, filtersStructure, selectedField, selectedCondition, selectedValue, updateTagList, addNewFilter}
    }
  }
</script>