<template>
  <section class="bg-gray-800">
    <div class="flex justify-between px-4 py-3">
      <!--Search input-->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-6 w-6 fill-current text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
        </div>

        <input class="bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-gray-300 rounded-lg pl-10 pr-4 py-2" type="text" placeholder="Search by keywords">
      </div>

      <!--Filters button-->
      <button class="inline-flex bg-gray-700 hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4">
        <svg class="h-6 w-6 fill-current text-gray-500 mt-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z"/></svg>
        <span class="ml-1 text-white font-medium mt-2">
          Filters
        </span>
      </button>
    </div>

    <form>
      <fieldset class="px-4 py-4 border-t border-gray-900">
        <div class="flex -mx-2">
          <!--Bedrooms-->
          <label class="block w-1/2 px-2">
            <span class="text-sm font-semibold text-gray-500">Bedrooms</span>
            <select class="mt-1 form-select rounded-lg block w-full">
              <option>4</option>
            </select>
          </label>

          <!--Bathrooms-->
          <label class="block w-1/2 px-2">
            <span class="text-sm font-semibold text-gray-500">Bathrooms</span>
            <select class="mt-1 form-select rounded-lg block w-full">
              <option>4</option>
            </select>
          </label>
        </div>

        <div class="mt-4">
          <!--Price range-->
          <label>
            <span class="text-sm font-semibold text-gray-500">Price Range</span>
            <select class="mt-1 form-select rounded-lg block w-full">
              <option>Up to $2,000/wk</option>
            </select>
          </label>
        </div>
      </fieldset>

      <!--Property type-->
      <fieldset class="px-4 py-4 border-t border-gray-900">
        <legend>Property Type</legend>

        <label>
          <input class="form-radio" type="radio" value="house">
          House
        </label>

        <label>
          <input class="form-radio" type="radio" value="apartment">
          Apartment
        </label>

        <label>
          <input class="form-radio" type="radio" value="loft">
          Loft
        </label>

        <label>
          <input class="form-radio" type="radio" value="townhouse">
          Townhouse
        </label>
      </fieldset>

      <!--Amenities-->
      <fieldset>
        <legend>Amenities</legend>

        <label>
          <input class="form-checkbox" type="checkbox" value="balcony">
          Balcony
        </label>

        <label>
          <input class="form-checkbox" type="checkbox" value="airConditioning">
          Air Conditioning
        </label>

        <label>
          <input class="form-checkbox" type="checkbox" value="pool">
          Pool
        </label>

        <label>
          <input class="form-checkbox" type="checkbox" value="beach">
          Beach
        </label>

        <label>
          <input class="form-checkbox" type="checkbox" value="petFriendly">
          Pet Friendly
        </label>

        <label>
          <input class="form-checkbox" type="checkbox" value="kidFriendly">
          Kid Friendly
        </label>

        <label>
          <input class="form-checkbox" type="checkbox" value="parking">
          Parking
        </label>
      </fieldset>

      <div>
        <button class="">Update results</button>
      </div>
    </form>

  </section>
</template>

<script>
  export default {
    name: "SearchFilters",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>