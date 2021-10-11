<template>
  <div class="w-20 h-[5.5rem] rounded-lg px-0.5 py-0.5 cursor-pointer
              flex flex-col items-center justify-center group"
       :class="[mainColor]">
    <div class="relative overflow-hidden group w-full h-full rounded-lg">
      <!--main content-->
      <div class="relative w-full h-full scale-y-105">
        <!--shadow-->
        <div class="absolute inset-x-0 h-full bg-black rounded-md
                 -bottom-1 scale-95 transform blur-sm opacity-75">
        </div>
        <!--inner container-->
        <div class="relative bg-weather-icon rounded-md h-full w-full flex flex-col
                items-center justify-around py-1 shadow-buttonInner shadow-2xl
                group-hover:bg-weather-icon-hover">
          <!--svg-->
          <slot name="svg-icon"></slot>
          <!--inner text-->
          <p class="text-gray-100 text-xxs text-center">
            {{textInner}}
          </p>
        </div>
      </div>
      <!--background object-->
      <div class="absolute bg-gray-300 w-24 h-24 rounded-full group-hover:bg-white
                top-0 right-0 -translate-y-8 -translate-x-4 opacity-[0.15]">
      </div>
    </div>
    <!--temperature-->
    <p class="-mb-1 text-black font-semibold text-xxs leading-relaxed">
      {{textOuter}}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps(["mainColor", "textInner", "textOuter"])
</script>