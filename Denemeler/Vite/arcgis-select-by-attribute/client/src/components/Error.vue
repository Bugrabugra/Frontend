<template>
  <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50">
    <div class="relative mx-auto w-auto max-w-2xl">
      <div class="bg-white w-full px-2 py-2 rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <div class="">
          Error at SQL statement
        </div>
        <button class="button" @click="closeError">
          Close
        </button>
      </div>
    </div>
  </div>

  <div @click="closeError"  class="absolute inset-0 z-30 opacity-25 bg-black"></div>
</template>

<script>
  import {useStore} from "vuex";


  export default {
    name: "Error",
    setup() {
      // store
      const store = useStore();

      // methods
      const closeError = () => {
        store.commit("setError", false);
      };

      return {closeError}
    }
  }
</script>