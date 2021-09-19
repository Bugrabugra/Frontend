<template>
  <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50">
    <div @click="clickOutside" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div
          class="relative mx-auto w-auto"
          :class="{'scale-105 transition': outside}"
      >
        <div class="bg-white w-full px-2 py-2 rounded-lg border-t-[10px] border-teal-300 h-24 shadow-2xl flex flex-col items-center justify-center">
          <div class="mb-4">
            Error at SQL statement
          </div>
          <button class="button" @click="closeError">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {ref} from "vue";


  export default {
    name: "Error",
    setup() {
      // store
      const store = useStore();

      // references
      const outside = ref(false);

      // methods
      const closeError = () => {
        store.commit("setError", false);
      };

      const clickOutside = () => {
        outside.value = true;
        setTimeout(() => {
          outside.value = false;
        }, 200)
      };

      return {clickOutside, closeError, outside}
    }
  }
</script>

<style scoped>

</style>