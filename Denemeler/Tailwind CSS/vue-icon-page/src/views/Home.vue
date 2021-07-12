<template>
  <div class="flex mx-auto sm:w-3/4 ">
    <div class="flex">
      <!--Text-->
      <div class="w-2/3">
        <!--Teal button-->
        <button class="bg-teal-100 rounded-full px-4 py-1 text-sm">
          <span class="font-bold">New in v1.4.0:</span>
          60+ weather icons!
        </button>

        <h2 class="text-4xl font-semibold mt-6">Bootstrap Icons</h2>
        <p class="text-xl">
          Free, high quality, open source icon library with over 1,300 icons.
          Include them anyway you like—SVGs, SVG sprite, or web fonts.
          Use them with or without Bootstrap in any project.
        </p>

        <div class="flex justify-between">
          <p class="text px-4 py-2 bg-gray-100 rounded">
            npm i bootstrap-icons
          </p>


        </div>

      </div>

      <!--Image-->
      <div class="w-1/3">
        <img src="@/assets/icons-hero.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {

    }
  }
</script>
