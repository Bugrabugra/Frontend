<template>
  <div class="px-4">
    <div>
      <h2 class="text-center text-xl text-gray-800 border-b border-gray-500 leading-loose w-full">
        <span>
          Results
        </span>
      </h2>

      <!--table headers-->
      <div
          class="grid px-2 py-2 text-gray-500 gap-2"
          :class="[gapClass]"
      >
        <div
            v-if="response"
            v-for="field in fields"
            :key="field.name"
            class="col-span-1 text-center font-bold px-2 py-2 bg-gray-300 rounded-md"
        >
          {{field.name}}
        </div>

        <!--data-->
        <div
            class="grid col-span-full text-gray-500 gap-2"
            :class="[gapClass]"
            v-for="data in response"
            :key="data._id"
        >
          <div
              class="flex justify-center items-center bg-gray-200 rounded-md text-gray-500"
              v-for="value in showAvailableValues(data)"
              :key="value"
          >
            {{value}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {computed} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "Results",
    setup() {
      // store
      const store = useStore();

      // computed
      const response = computed(() => {
        return store.state.response;
      });

      const fields = computed(() => {
        return store.state.fieldsToShow.map(field => {
          return store.state.fields.find(f => f.value === field);
        });
      });

      const gapClass = computed(() => {
        console.log(fields.value.length)
        return `grid-cols-${fields.value.length}`
      });

      const showAvailableValues = (data) => {
        return Object.keys(data).filter(f => {
          return f !== "_id";
        }).map(v => {
          return data[v];
        })
      };

      return {fields, gapClass, response, showAvailableValues}
    }
  }
</script>