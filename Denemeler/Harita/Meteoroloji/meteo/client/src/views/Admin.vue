<template>
  <div class="min-h-screen flex justify-center bg-gradient-to-b
              from-blue-300 to-green-300">
    <div class="mt-5 w-2/3 md:w-3/4 lg:w-2/4 xl:w-2/4 2xl:w-1/3">
      <button @click="back" class="users-button bg-red-300 flex">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
        <span>
          Ana ekrana dön
        </span>
      </button>
      <div class="mt-4 z-20 flex justify-between items-center space-x-2">
        <div
            v-for="(tab, index) in tabs"
            @click="changeTab(tab)"
            :key="index"
            class="bg-blue-400 px-2 py-1 rounded-t-lg
                   md:h-auto sm:h-12 sm:w-full text-center cursor-pointer"
            :class="{'bg-gray-100': tab === selectedTab}"
        >
          {{tab}}
        </div>
      </div>

      <div class="z-10">
        <Users v-if="selectedTab === 'Kullanıcı yönetimi'"/>
        <Rules v-if="selectedTab === 'Kural yönetimi'"/>
        <Warnings v-if="selectedTab === 'Uyarı yönetimi'"/>

        <!--<transition-->
        <!--    mode="out-in"-->
        <!--    enter-active-class="animate__animated animate__zoomIn"-->
        <!--    leave-active-class="animate__animated animate__zoomOut"-->
        <!--&gt;-->
        <!--</transition>-->
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {useRouter} from "vue-router";
  import Users from "../components/Admin/Users/Users.vue";
  import Rules from "../components/Admin/Rules/Rules.vue";
  import Warnings from "../components/Admin/Warnings/Warnings.vue";


  // router
  const router = useRouter();

  // references
  const tabs = ref([
      "Kullanıcı yönetimi",
      "Kural yönetimi",
      "Uyarı yönetimi"
  ]);
  const selectedTab = ref("Kullanıcı yönetimi");

  // methods
  const changeTab = (tab) => {
    selectedTab.value = tab;
  };

  const back = () => {
    router.push("/")
  };
</script>