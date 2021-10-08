<template>
  <Map/>
  <!--<div class="flex px-4 py-4 flex-wrap gap-2">-->
  <!--  <Buttons text-inner="Hafif" text-outer="1 - 20" main-color="bg-rain-light">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Orta" text-outer="1 - 20" main-color="bg-rain-medium">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Şiddetli" text-outer="1 - 20" main-color="bg-rain-heavy">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Çok Şiddetli" text-outer="1 - 20" main-color="bg-rain-very-heavy">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Aşırı" text-outer="1 - 20" main-color="bg-rain-severe">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Hafif" text-outer="1 - 20" main-color="bg-snow-light">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Kuvvetli" text-outer="1 - 20" main-color="bg-snow-heavy">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->

  <!--  <Buttons text-inner="Yoğun" text-outer="1 - 20" main-color="bg-snow-severe">-->
  <!--    <template #svg-icon>-->
  <!--      <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:transform group-hover:scale-110 text-gray-100 h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />-->
  <!--      </svg>-->
  <!--    </template>-->
  <!--  </Buttons>-->
  <!--</div>-->
</template>

<script setup>
  import Map from "../components/Home/Map.vue";
  import Buttons from "../components/Home/Buttons.vue";
</script>