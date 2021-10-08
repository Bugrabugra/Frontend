<template>
  <div class="absolute z-20 top-5 left-5 bottom-5 flex space-y-2">
    <div class="w-80 h-full bg-gray-900 rounded-lg">
      <!--top section-->
      <div class="flex flex-col bg-gray-800 px-2 py-2">
        <!--logo and headers-->
        <div class="flex">
          <!--logo-->
          <img
              src="src/assets/images/abb-logo.png"
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
            <h2>
              {{subHeader}}
            </h2>
          </div>
        </div>

        <!--nowcast and forecast icons-->
        <div class="">

        </div>

      </div>

      <!--bottom section-->
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const subHeader = ref("");
</script>

<style scoped>

</style>