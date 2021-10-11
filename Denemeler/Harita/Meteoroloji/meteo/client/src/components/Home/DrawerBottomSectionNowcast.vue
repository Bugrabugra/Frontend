<template>
  <!--precipitation-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Yağmur</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/precipitation.svg"
            alt="precipitation"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonPrecipitation in buttonsPrecipitation"
          :text-inner="buttonPrecipitation.textInner"
          :text-outer="buttonPrecipitation.textOuter"
          :main-color="buttonPrecipitation.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-7 w-7"
              :src="`src/assets/images/drawer/menu-inner/${buttonPrecipitation.icon}`"
              :alt="buttonPrecipitation.icon"
          >
        </template>
      </Button>
    </div>
  </div>

  <!--snow-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Kar</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/snow.svg"
            alt="snow"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonSnow in buttonsSnow"
          :text-inner="buttonSnow.textInner"
          :text-outer="buttonSnow.textOuter"
          :main-color="buttonSnow.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-7 w-7"
              :src="`src/assets/images/drawer/menu-inner/${buttonSnow.icon}`"
              :alt="buttonSnow.icon"
          >
        </template>
      </Button>
    </div>
  </div>

  <!--storm polygon-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Fırtına Poligonu</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/storm-polygon.svg"
            alt="wind"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonStormPolygon in buttonsStormPolygon"
          :text-inner="buttonStormPolygon.textInner"
          :text-outer="buttonStormPolygon.textOuter"
          :main-color="buttonStormPolygon.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-8 w-8"
              :src="`src/assets/images/drawer/menu-inner/${buttonStormPolygon.icon}`"
              :alt="buttonStormPolygon.icon"
          >
        </template>
      </Button>
    </div>
  </div>

  <!--lightning-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Yıldırım & Şimşek</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/lightning.svg"
            alt="heat"
            class="w-7"
        >
      </div>
    </div>
  </div>

  <!--flood-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Sel & Su Baskını</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/flood.svg"
            alt="cloud"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonFlood in buttonsFlood"
          :text-inner="buttonFlood.textInner"
          :text-outer="buttonFlood.textOuter"
          :main-color="buttonFlood.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-10 w-10"
              :src="`src/assets/images/drawer/menu-inner/${buttonFlood.icon}`"
              :alt="buttonFlood.icon"
          >
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
  import Button from "./Button.vue";
  import {ref} from "vue";

  // references
  // precipitation
  const buttonsPrecipitation = ref([
    {textInner: "Hafif", textOuter: "20-30", color: "bg-gradient-to-r from-[#BDDBAC] via-[#65B32E] to-[#4EAE33]", icon: "precipitation-light.svg"},
    {textInner: "Orta", textOuter: "30-40", color: "bg-gradient-to-r from-[#4EAE33] via-[#1B9C38] to-[#EFE511]", icon: "precipitation-medium.svg"},
    {textInner: "Şiddetli", textOuter: "40-50", color: "bg-gradient-to-r from-[#FFE7A4] via-[#FEC90A] to-[#F8AC1D]", icon: "precipitation-heavy.svg"},
    {textInner: "Çok Şiddetli", textOuter: "50-60", color: "bg-gradient-to-r from-[#F59925] via-[#E5201C] to-[#D0131C]", icon: "precipitation-very-heavy.svg"},
    {textInner: "Aşırı", textOuter: "60-75", color: "bg-gradient-to-r from-[#D0131C] via-[#CF1418] to-[#9F589E]", icon: "precipitation-severe.svg"}
  ]);

  // snow
  const buttonsSnow = ref([
    {textInner: "Hafif", textOuter: "20-30", color: "bg-gradient-to-r from-[#C2E0EF] via-[#9CD1E8] to-[#86C8E4]", icon: "snow-light.svg"},
    {textInner: "Kuvvetli", textOuter: "30-40", color: "bg-gradient-to-r from-[#7CCCE9] via-[#52C2E9] to-[#3565AE]", icon: "snow-medium.svg"},
    {textInner: "Yoğun", textOuter: "40-50", color: "bg-gradient-to-r from-[#3565AE] via-[#14438D] to-[#563A8F]", icon: "snow-heavy.svg"},
  ]);

  // storm polygon
  const buttonsStormPolygon = ref([
    {textInner: "", textOuter: "Hafif", color: "bg-gradient-to-r from-[#BCC479] via-[#9DAE3C] to-[#788D30]", icon: "wind-light.svg"},
    {textInner: "", textOuter: "Orta", color: "bg-gradient-to-r from-[#F39454] via-[#EE7626] to-[#D46229]", icon: "wind-heavy.svg"},
    {textInner: "", textOuter: "Kuvvetli", color: "bg-gradient-to-r from-[#B07EB6] via-[#8A3F91] to-[#733189]", icon: "wind-severe.svg"},
  ]);

  // flood
  const buttonsFlood = ref([
    {textInner: "", textOuter: "Yıldırım Bazlı", color: "bg-gradient-to-r from-[#78B2C6] via-[#369AB4] to-[#098AA7]", icon: "flood-severe.svg"},
    {textInner: "", textOuter: "Yağış Bazlı", color: "bg-gradient-to-r from-[#B1DAE0] via-[#82C7D1] to-[#5CBBC7]", icon: "flood-normal.svg"}
  ]);
</script>