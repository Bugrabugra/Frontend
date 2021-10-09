<template>
  <div class="w-48 h-52 rounded-3xl px-2 py-2 cursor-pointer
              flex flex-col items-center justify-center group"
       :class="[mainColor]">
    <div class="relative overflow-hidden group w-full h-full rounded-3xl">
      <!--main content-->
      <div class="relative w-full scale-y-105">
        <!--shadow-->
        <div class="absolute inset-x-0 h-full bg-black rounded-3xl
                 -bottom-2 scale-95 transform blur-sm opacity-75">
        </div>
        <!--inner container-->
        <div class="relative bg-weather-icon rounded-3xl h-full w-full flex flex-col
                items-center justify-around py-4 shadow-buttonInner shadow-2xl
                group-hover:bg-weather-icon-hover">
          <!--svg-->
          <slot name="svg-icon"></slot>
          <!--inner text-->
          <p class="text-gray-100 text-2xl font-semibold tracking-widest">
            {{textInner}}
          </p>
        </div>
      </div>
      <!--background object-->
      <div class="absolute bg-gray-300 w-60 h-60 rounded-full group-hover:bg-white
                top-0 right-0 -translate-y-24 -translate-x-10 opacity-25">
      </div>
    </div>
    <!--temperature-->
    <p class="-mb-2 text-gray-100 font-semibold text-lg leading-relaxed tracking-widest">
      {{textOuter}}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps(["mainColor", "textInner", "textOuter"])
</script>

<style scoped>

</style>