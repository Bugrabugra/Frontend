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
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && openWeatherMapResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="(openWeatherMapResult, index) in openWeatherMapResults"
            :key="index"
            class="py-2 cursor-pointer"
            @click="previewCity(openWeatherMapResult)"
          >
            {{ openWeatherMapResult.name }}, {{ openWeatherMapResult.state }},
            {{ openWeatherMapResult.country }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const router = useRouter();

const previewCity = (searchResult) => {
  const state = searchResult.state;
  const city = searchResult.name;
  router.push({
    name: "cityView",
    params: { state, city },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const openWeatherMapResults = ref(null);
const searchError = ref(false);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=10&appid=dffd31e8aef8da57882447db8d7ec37f`
        );
        console.log(result);
        openWeatherMapResults.value = result.data;
      } catch (error) {
        searchError.value = true;
      }

      return;
    }
    openWeatherMapResults.value = null;
  }, 300);
};
</script>
