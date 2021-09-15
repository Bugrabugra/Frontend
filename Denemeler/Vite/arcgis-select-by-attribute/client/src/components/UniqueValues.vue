<template>
  <div class="grid grid-rows-6 min-h-full gap-1">
    <!--unique values list-->
    <div class="row-span-5 h-0 min-h-full bg-white border border-gray-400 overflow-y-auto overflow-x-hidden">
      <ul>
        <li
            @dblclick="addToQuery(uniqueValue)"
            class="px-2 py-1 border border-gray-200 hover:bg-blue-100 transition duration-300 cursor-pointer"
            v-for="uniqueValue in filteredUniqueValues"
        >
          {{uniqueValue }}
        </li>
      </ul>
    </div>

    <!--button and input-->
    <div class="row-span-1">
      <div class="grid grid-cols-6 gap-x-1 min-h-full">
        <button @click="getUniqueValues" class="col-span-3 button text-xs">
          Get Unique Values
        </button>
        <div class="col-span-3 grid grid-cols-3 flex items-center justify-center">
          <label class="col-span-1 text-xs" for="input-unique-value">
            Go To:
          </label>
          <input v-model="goTo" class="col-span-2 outline-none px-1" type="text" id="input-unique-value">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref, computed} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "UniqueValue",
    setup() {
      // store
      const store = useStore();

      // references
      const goTo = ref("");

      // computed
      const uniqueValues = computed(() => {
        return store.state.uniqueValues;
      });

      console.log(uniqueValues)

      const filteredUniqueValues = computed(() => {
        if (uniqueValues.value) {
          return uniqueValues.value.filter(uv => {
            return String(uv).includes(goTo.value)
          })
        }
      })

      // methods
      const getUniqueValues = () => {
        store.dispatch("getUniqueValues");
      };

      const addToQuery = (field) => {
        store.commit("updateQuery", field);
      };

      return {goTo, uniqueValues, filteredUniqueValues, addToQuery, getUniqueValues}
    }
  }
</script>