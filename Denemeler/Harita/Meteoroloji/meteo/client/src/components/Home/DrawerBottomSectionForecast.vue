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

  <!--wind-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Rüzgar</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/wind.svg"
            alt="wind"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonWind in buttonsWind"
          :text-inner="buttonWind.textInner"
          :text-outer="buttonWind.textOuter"
          :main-color="buttonWind.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-9 w-9"
              :src="`src/assets/images/drawer/menu-inner/${buttonWind.icon}`"
              :alt="buttonWind.icon"
          >
        </template>
      </Button>
    </div>
  </div>

  <!--heat-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Sıcaklık</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/heat.svg"
            alt="heat"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonHeat in buttonsHeat"
          :text-inner="buttonHeat.textInner"
          :text-outer="buttonHeat.textOuter"
          :main-color="buttonHeat.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-7 w-7"
              :src="`src/assets/images/drawer/menu-inner/${buttonHeat.icon}`"
              :alt="buttonHeat.icon"
          >
        </template>
      </Button>
    </div>
  </div>

  <!--humidity-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Nem</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/humidity.svg"
            alt="cloud"
            class="w-7"
        >
      </div>
    </div>
  </div>

  <!--cloud-->
  <div class="flex flex-col w-full px-2 py-2 bg-map-drawer-top-menu rounded-lg">
    <!--toggle button / header / menu icon-->
    <div class="flex justify-between">
      <!--toggle button / header-->
      <div class="flex space-x-2">
        <!--<button class="bg-yellow-300">Toggle</button>-->
        <p class="text-gray-100">Bulut</p>
      </div>

      <!--menu icon-->
      <div class="">
        <img
            src="../../assets/images/drawer/menu-header/cloud.svg"
            alt="cloud"
            class="w-7"
        >
      </div>
    </div>

    <!--weather-icons-->
    <div class="flex space-x-1 mt-1">
      <Button
          v-for="buttonCloud in buttonsCloud"
          :text-inner="buttonCloud.textInner"
          :text-outer="buttonCloud.textOuter"
          :main-color="buttonCloud.color"
      >
        <template #svg-icon>
          <img
              class="group-hover:transform group-hover:scale-110 h-12 w-12"
              :src="`src/assets/images/drawer/menu-inner/${buttonCloud.icon}`"
              :alt="buttonCloud.icon"
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

  // wind
  const buttonsWind = ref([
    {textInner: "Kuvvetli Rüzgar", textOuter: "39-61", color: "bg-gradient-to-r from-[#6D6684] via-[#4485BB] to-[#8FC151]", icon: "wind-light.svg"},
    {textInner: "Fırtına", textOuter: "62-74", color: "bg-gradient-to-r from-[#8FC151] via-[#C9D644] to-[#C2B543]", icon: "wind-heavy.svg"},
    {textInner: "Kuvvetli Fırtına", textOuter: "75-88", color: "bg-gradient-to-r from-[#C6BB44] via-[#D6BD40] to-[#D59944]", icon: "wind-severe.svg"},
    {textInner: "Tam Fırtına", textOuter: ">89", color: "bg-gradient-to-r from-[#D59944] via-[#D4784D] to-[#C94870]", icon: "wind-full-storm.svg"},
  ]);

  // heat
  const buttonsHeat = ref([
    {textInner: "Don", textOuter: "<20", color: "bg-gradient-to-r from-[#E4E5E4] via-[#DBC1DE] to-[#D9A7CD]", icon: "heat-frost.svg"},
    {textInner: "Güneş Çarpması", textOuter: "36-41", color: "bg-gradient-to-r from-[#DB6E54] via-[#DB6C2B] to-[#B73666]", icon: "heat-sunstroke.svg"},
    {textInner: "Isı Krampı", textOuter: "41-54", color: "bg-gradient-to-r from-[#B73666] via-[#912B50] to-[#6B1527]", icon: "heat-heat-cramp.svg"},
    {textInner: "Termal Şok", textOuter: ">54", color: "bg-gradient-to-r from-[#641323] via-[#431118] to-[#240C0E]", icon: "heat-thermal-shock.svg"},
  ]);

  // cloud
  const buttonsCloud = ref([
    {textInner: "Alçak", textOuter: "0-30", color: "bg-gradient-to-r from-[#587BA7] via-[#7493B7] to-[#7691B2]", icon: "cloud-low.svg"},
    {textInner: "Orta", textOuter: "30-60", color: "bg-gradient-to-r from-[#7691B2] via-[#9CAABC] to-[#B5BEC7]", icon: "cloud-medium.svg"},
    {textInner: "Yüksek", textOuter: "60-100", color: "bg-gradient-to-r from-[#B5BEC7] via-[#DEDEDE] to-[#F3F3F3]", icon: "cloud-high.svg"},
  ]);
</script>