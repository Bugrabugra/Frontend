<template>
  <!--normal-->
  <div 
      v-if="!isHovered"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      class="rounded flex flex-col items-center justify-center"
  >
    <!--image-->
    <img src="https://cdn.akamai.steamstatic.com/steam/apps/606680/header.jpg?t=1562764777"
         alt="picture"
    >
    <!--footer-->
    <div class="bg-black flex justify-between items-center w-full px-2">
      <!--platforms-->
      <div class="flex justify-start text-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd" />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
      </div>

      <!--discount and prices-->
      <div class="flex justify-center items-center space-x-5">
        <!--discount-->
        <p class="text-olive font-semibold">
          -90%
        </p>

        <div class="">
          <!--old price-->
          <p class="text-gray-500 text-xs">11,00 TL</p>

          <!--new price-->
          <p class="text-olive text-sm">3,63 TL</p>
        </div>
      </div>
    </div>
    
  </div>
  
  <!--hover-->
  <div
      v-if="isHovered"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      class="rounded flex flex-col items-center justify-center w-80"
  >
    <!--background image-->
    <img src="https://cdn.akamai.steamstatic.com/steam/apps/606680/ss_f06145903ab5c319db9fd74bee8c11117b24c227.1920x1080.jpg?t=1562764777"
         alt="picture"
    >


    <!--bottom content-->
    <div class="relative flex flex-col px-2 items-start bg-gradient-to-b from-gray-900 to-gray-800 w-full">
      <!--discount and prices-->
      <div class="flex justify-center items-center space-x-5 absolute right-0 mr-2">
        <!--discount-->
        <p class="text-olive font-semibold">
          -90%
        </p>

        <div>
          <!--old price-->
          <p class="text-gray-500 text-xs">11,00 TL</p>

          <!--new price-->
          <p class="text-olive text-sm">3,63 TL</p>
        </div>
      </div>

      <!--picture and discount & prices-->
      <div class="absolute left-0 -top-7">
        <!--game image-->
        <img src="https://cdn.akamai.steamstatic.com/steam/apps/606680/header.jpg?t=1562764777"
             alt="picture"
             class="w-32"
        >
      </div>

      <!--game info-->
      <div class="flex flex-col space-y-1 mt-16">
        <p class="text-xl text-white text-left">Silver</p>
        <!--tags-->
        <div class="flex justify-around text-left text-xs space-x-1">
          <p class="px-1 py-1 bg-gray-700 rounded">RPG</p>
          <p class="px-1 py-1 bg-gray-700 rounded">Action</p>
          <p class="px-1 py-1 bg-gray-700 rounded">Classic</p>
          <p class="px-1 py-1 bg-gray-700 rounded">Singleplayer</p>
        </div>

        <div class="flex space-x-1">
          <p class="text-green-700">Very Positive</p>
          <p class="text-gray-400">|</p>
          <p class="text-blue-400">507 User Reviews</p>
        </div>

        <div class="flex space-x-3">
          <!--platforms-->
          <div class="flex justify-start text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd" />
              <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
            </svg>
          </div>

          <p class="text-blue-400 text-lg">2 Jun, 2017</p>
        </div>



      </div>

    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Card",
    setup() {
      // references
      const isHovered = ref(false);

      return {isHovered}
    }
  }
</script>

<style scoped>

</style>