<template>
  <section class="bg-gray-800 xl:w-72">
    <div class="flex justify-between px-4 py-3 xl:hidden">
      <!--Search input-->
      <div class="relative max-w-xs w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-6 w-6 fill-current text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
        </div>

        <input class="block w-full bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-gray-300 rounded-lg pl-10 pr-4 py-2" type="text" placeholder="Search by keywords">
      </div>

      <!--Filters button-->
      <button
          @click="toggle"
          type="button"
          :class="{'bg-gray-600': isOpen, 'bg-gray-700': !isOpen}"
          class="ml-4 inline-flex focus:outline-none focus:shadow-outline hover:bg-gray-600 shadow rounded-lg pl-3 pr-4"
      >
        <svg class="h-6 w-6 fill-current text-gray-500 mt-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z"/></svg>
        <span class="ml-1 text-white font-medium mt-2">
          Filters
        </span>
      </button>
    </div>

    <!--Filters form-->
    <form :class="{ 'hidden': !isOpen, 'block': isOpen }" class="xl:block xl:h-full xl:flex xl:flex-col xl:justify-between">
      <div class="lg:flex xl:block xl:overflow-y-auto">
        <div class="px-4 py-4 border-t border-gray-900 xl:border-t-0 lg:w-1/3 xl:w-full">
          <div class="flex flex-wrap -mx-2">
            <!--Bedrooms-->
            <label class="block w-1/2 px-2 sm:w-1/4 lg:w-1/2">
              <span class="text-sm font-semibold text-gray-500">Bedrooms</span>
              <select class="mt-1 form-select border-lg bg-gray-700 focus:bg-gray-600 focus:border-transparent shadow border-transparent text-white leading-snug rounded-lg block w-full">
                <option>4</option>
              </select>
            </label>

            <!--Bathrooms-->
            <label class="block w-1/2 px-2 sm:w-1/4 lg:w-1/2">
              <span class="text-sm font-semibold text-gray-500">Bathrooms</span>
              <select class="mt-1 form-select border-lg bg-gray-700 focus:bg-gray-600 focus:border-transparent shadow border-transparent text-white leading-snug rounded-lg block w-full">
                <option>2</option>
              </select>
            </label>


            <!--Price range-->
            <label class="mt-4 block w-full px-2 sm:mt-0 sm:w-1/2 lg:mt-4 lg:w-full">
              <span class="text-sm font-semibold text-gray-500">Price Range</span>
              <select class="mt-1 form-select border-lg bg-gray-700 focus:bg-gray-600 focus:border-transparent shadow border-transparent text-white leading-snug rounded-lg block w-full">
                <option>Up to $2,000/wk</option>
              </select>
            </label>
          </div>
        </div>

        <!--Property type-->
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/3 lg:border-l xl:w-full">
          <span class="block text-sm font-semibold text-gray-500">
            Property Type
          </span>

          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio h-6 w-6 bg-gray-900 checked:bg-indigo-500 border-transparent leading-snug" type="radio" value="house">
              <span class="ml-2 text-white">House</span>
            </label>

            <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio h-6 w-6 bg-gray-900 checked:bg-indigo-500 border-transparent leading-snug" type="radio" value="apartment">
              <span class="ml-2 text-white">Apartment</span>
            </label>

            <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio h-6 w-6 bg-gray-900 checked:bg-indigo-500 border-transparent leading-snug" type="radio" value="loft">
              <span class="ml-2 text-white">Loft</span>
            </label>

            <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio h-6 w-6 bg-gray-900 checked:bg-indigo-500 border-transparent leading-snug" type="radio" value="townhouse">
              <span class="ml-2 text-white">Townhouse</span>
            </label>
          </div>
        </div>

        <!--Amenities-->
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/3 lg:border-l xl:w-full">
          <span class="block text-sm font-semibold text-gray-500">Amenities</span>

          <div class="sm:flex sm:flex-wrap sm:-mx-2">
            <label class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="balcony">
              <span class="ml-2 text-white">Balcony</span>
            </label>

            <label class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="pool">
              <span class="ml-2 text-white">Pool</span>
            </label>

            <label class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="beach">
              <span class="ml-2 text-white">Beach</span>
            </label>

            <label class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="petFriendly">
              <span class="ml-2 text-white">Pet Friendly</span>
            </label>

            <label class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="kidFriendly">
              <span class="ml-2 text-white">Kid Friendly</span>
            </label>

            <label class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="parking">
              <span class="ml-2 text-white">Parking</span>
            </label>

            <label class="mt-3 flex items-center sm:w-1/2 sm:px-2 lg:w-full">
              <input class="form-checkbox h-6 w-6 bg-gray-900 rounded-lg checked:bg-indigo-500 border-transparent leading-snug" type="checkbox" value="airConditioning">
              <span class="ml-2 text-white">Air Conditioning</span>
            </label>
          </div>
        </div>
      </div>


      <!--Update results button-->
      <div class="bg-gray-900 px-4 py-4 sm:text-right">
        <button class="block w-full sm:w-auto sm:inline-block bg-blue-500 hover:bg-blue-400 font-semibold text-white px-4 py-2 rounded-lg xl:block xl:w-full">Update results</button>
      </div>

    </form>

  </section>
</template>

<script>
  export default {
    name: "SearchFilters",
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      }
    }
  }
</script>

<style scoped>

</style>