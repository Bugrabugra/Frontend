<template>
  <div class="relative w-48 h-52 rounded-3xl px-1.5 py-1.5 cursor-pointer
              flex flex-col items-center justify-center overflow-hidden group"
       :class="[mainColor]">
    <!--main content-->
    <div class="bg-weather-icon rounded-3xl h-full w-full flex flex-col
                items-center justify-around py-4 shadow-buttonInner
                group-hover:bg-weather-icon-hover">
      <slot name="svg-icon">

      </slot>
      <!--inner text-->
      <p class="text-gray-100 text-2xl font-semibold tracking-widest">{{textInner}}</p>
    </div>

    <!--background object-->
    <div class="absolute bg-gray-300 w-80 h-80 rounded-full group-hover:bg-white
                -translate-y-24 -translate-x-24 opacity-25">
    </div>

    <!--temperature-->
    <p class="-mb-1 text-gray-100 font-semibold text-lg leading-relaxed tracking-widest">
      {{textOuter}}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps(["mainColor", "textInner", "textOuter"])
</script>

<style scoped>

</style>