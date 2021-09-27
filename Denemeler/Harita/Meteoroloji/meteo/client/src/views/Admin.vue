<template>
  <div class="min-h-screen flex justify-center bg-gray-400">
    <div class="mt-10 w-2/3 md:w-3/4 lg:w-2/4 xl:w-2/4 2xl:w-1/3">
      <div class="z-20 flex justify-around items-center space-x-2">
        <div
            v-for="tab in tabs"
            class="bg-blue-400 hover:bg-blue-300 px-2 py-1 rounded-t-lg w-full text-center
                   cursor-pointer"
        >
          {{tab}}
        </div>
      </div>

      <div class="z-10">
        <Users/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Users from "../components/Admin/Users.vue";
  import {ref} from "vue";

  // references
  const tabs = ref([
      "Kullanıcı yönetimi",
      "Kural yönetimi",
      "Grup yönetimi"
  ])
</script>

<style scoped>

</style>