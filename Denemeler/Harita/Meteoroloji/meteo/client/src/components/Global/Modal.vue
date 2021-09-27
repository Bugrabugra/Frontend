<template>
  <div class="fixed overflow-y-hidden overflow-x-hidden inset-0 z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <div
          @click="clickOutside"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
          class="relative mx-auto w-auto inline-block align-bottom"
          :class="{'scale-105 transition': outside}"
      >
        <div class="bg-white w-full px-3 py-2 rounded-lg border-t-[10px]
                    border-red-300 shadow-2xl flex flex-col items-center
                    justify-center">
          <div class="mb-4" v-html="content"></div>

          <button
              class="users-button bg-blue-400"
              @click="closeError">
            Kapat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useStore} from "vuex";
  import {ref} from "vue";

  // store
  const store = useStore();

  // props
  defineProps(["content"])

  // references
  const outside = ref(false);


  // methods
  const closeError = () => {
    console.log("button")
    store.commit("general/setModal", false);
  };

  const clickOutside = () => {
    outside.value = true;
    setTimeout(() => {
      outside.value = false;
    }, 200)
  };
</script>

<style scoped>

</style>