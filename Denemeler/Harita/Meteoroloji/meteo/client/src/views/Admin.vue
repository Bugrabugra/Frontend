<template>
  <div class="min-h-screen flex justify-center bg-gradient-to-b
              from-blue-300 to-green-300">
    <div class="mt-10 w-2/3 md:w-3/4 lg:w-2/4 xl:w-2/4 2xl:w-1/3">
      <div class="z-20 flex justify-around items-center space-x-2">
        <div
            v-for="(tab, index) in tabs"
            @click="changeTab(tab)"
            :key="index"
            class="bg-blue-400 px-2 py-1 rounded-t-lg
                   w-full text-center cursor-pointer"
            :class="{'bg-gray-100': tab === selectedTab}"
        >
          {{tab}}
        </div>
      </div>

      <div class="z-10">
        <Users v-if="selectedTab === 'Kullanıcı yönetimi'"/>
        <Rules v-if="selectedTab === 'Kural yönetimi'"/>
        <Groups v-if="selectedTab === 'Grup yönetimi'"/>

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
  import Users from "../components/Admin/Users/Users.vue";
  import Rules from "../components/Admin/Rules/Rules.vue";
  import Groups from "../components/Admin/Groups/Groups.vue";

  // references
  const tabs = ref([
      "Kullanıcı yönetimi",
      "Kural yönetimi",
      "Grup yönetimi"
  ]);
  const selectedTab = ref("Kullanıcı yönetimi");

  const changeTab = (tab) => {
    selectedTab.value = tab;
  };
</script>