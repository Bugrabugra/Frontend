<template>
  <div class="px-4">
    <h2 class="text-center text-xl text-gray-800 border-b border-gray-500 leading-loose w-full">
      <span class="">
        Fields to Show
      </span>
    </h2>

    <h2 class="text-center text-gray-100 bg-gray-400 px-2 mt-2 block rounded-lg">
      Drag and drop to change column ordering
    </h2>

    <!--tag list-->
    <div class="flex items-center justify-between mt-2 border border-gray-400 rounded">
      <div
          class="_container flex"
      >
        <!--tags-->
        <div
            v-for="(field, index) in fieldsToSort"
            :key="index"
            :item="field.id"
            draggable="true"
            class="draggable flex cursor-move border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 px-1 mx-1 my-1 items-center rounded select-none"
        >
          {{field.name}}
          <button class="ml-1" @click="removeField(index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!--<button @click="resetFields">-->
      <!--  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
      <!--    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />-->
      <!--  </svg>-->
      <!--</button>-->
    </div>

    <!--sorters-->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
      <!--sort-1-->
      <div>
        <h2 class="text-center text-xl text-gray-800">
          Sort 1
        </h2>

        <!--buttons-->
        <div class="flex items-center space-x-4">
          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option v-for="field in fields" :value="field.value">
              {{field.name}}
            </option>
          </select>

          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </div>

      <!--sort-2-->
      <div>
        <h2 class="text-center text-xl text-gray-800">
          Sort 2
        </h2>

        <!--buttons-->
        <div class="flex items-center space-x-4">
          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option v-for="field in fields" :value="field.value">
              {{field.name}}
            </option>
          </select>

          <select class="flex-1 outline-none px-2 py-1 rounded text-sm text-gray-700 bg-transparent border border-gray-400">
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref, onMounted} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "FieldsToShow",
    setup() {
      // store
      const store = useStore();

      // references
      const fields = ref(store.state.fields.filter(field => {
        return field.value !== "tags";
      }));

      const fieldsToSort = ref(store.state.fields.filter(field => field.value !== "tags"));

      // methods
      function updateField() {
        const container = document.querySelector("._container");

        const _fieldsToSort = [];
        [...container.children].forEach(child => {
          fieldsToSort.value.forEach(field => {
            if (field.id === +child.getAttribute("item")) {
              _fieldsToSort.push(field.value);
            }
          })
        })
        store.commit("setFieldsToShow", _fieldsToSort);
      }

      const removeField = (index) => {
        fieldsToSort.value = fieldsToSort.value.filter(field => {
          return field !== fieldsToSort.value[index];
        });
        updateField();
      };

      // on mount
      onMounted(() => {
        const draggables = document.querySelectorAll(".draggable");
        const container = document.querySelector("._container");
        updateField();

        // draggables
        draggables.forEach(draggable => {
          draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging");
          });

          draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging");
          });

          draggable.addEventListener("drop", (e) => {
            e.preventDefault();
            updateField();
          });

          draggable.addEventListener("dragend", (e) => {
            e.preventDefault();
            updateField();
          });
        });

        // container
        container.addEventListener("dragover", (e) => {
          e.preventDefault();
          const afterElement = getDragAfterElement(container, e.clientX);
          const draggable = document.querySelector(".dragging");

          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        });

        function getDragAfterElement(container, x) {
          const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
          return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
              return {offset: offset, element: child};
            } else {
              return closest;
            }
          }, {offset: Number.NEGATIVE_INFINITY}).element;
        }
      });
      
      return {fields, fieldsToSort, removeField}
    }
  }
</script>

<style scoped>
  .draggable.dragging {
    opacity: 0.5;
    border: 2px solid crimson !important
  }
</style>