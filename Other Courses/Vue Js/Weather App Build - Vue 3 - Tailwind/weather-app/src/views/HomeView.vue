<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
        placeholder="Search for a city or state"
        type="text"
        @input="getSearchResults"
      />
      <ul
        v-if="openWeatherMapResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          v-for="(openWeatherMapResult, index) in openWeatherMapResults"
          :key="index"
          class=""
        >
          {{ openWeatherMapResult.name }}, {{ openWeatherMapResult.state }},
          {{ openWeatherMapResult.country }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const searchQuery = ref("");
const queryTimeout = ref(null);
const openWeatherMapResults = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=10&appid=dffd31e8aef8da57882447db8d7ec37f`
      );
      console.log(result);
      openWeatherMapResults.value = result.data;
      return;
    }
    results.value = null;
  }, 300);
};
</script>
