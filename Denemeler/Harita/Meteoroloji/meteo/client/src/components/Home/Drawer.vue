<template>
  <div class="absolute z-20 top-5 left-5 bottom-5 flex space-y-2">
    <div class="w-80 h-full bg-gray-900 rounded-lg overflow-hidden">
      <!--top section-->
      <div class="flex flex-col bg-gray-800 px-3 pt-2">
        <!--logo and headers-->
        <div class="flex">
          <!--logo-->
          <img
              src="../../assets/images/abb-logo.png"
              alt="ABB Logo"
              class="h-12"
          >

          <!--headers-->
          <div class="text-center w-full">
            <!--main header-->
            <h3 class="text-lg text-map-left-menu-header">
              Ankara Büyükşehir Belediyesi
            </h3>

            <!--sub header-->
            <h2 class="text-xs text-gray-400">
              {{subHeader}}
            </h2>
          </div>
        </div>

        <!--nowcast and forecast icons-->
        <div class="flex space-x-4 mt-2">
          <button
              class="text-gray-300 pb-1"
              :class="{'border-b-2 border-gray-300': menu === 'forecast'}"
              @click="menu = 'forecast'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <button
              class="text-gray-300 pb-1 "
              :class="{'border-b-2 border-gray-300': menu === 'nowcast'}"
              @click="menu = 'nowcast'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
      <!--bottom section-->
      <div class="flex">

      </div>
    </div>
  </div>
</template>

<script setup>
  import {computed, ref} from "vue";

  // references
  const menu = ref("forecast");

  // computed
  const subHeader = computed(() => {
    return menu.value === "forecast" ?
        "Gelişmiş Hava Tahmin Ekranı" :
        "Hava Afet Kontrol ve Durumsal Farkındalık Ekranı"
  });

</script>

<style scoped>

</style>