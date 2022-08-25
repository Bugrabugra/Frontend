<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import CityCard from "../components/CityCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      console.log(city);
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=dffd31e8aef8da57882447db8d7ec37f&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon },
  });
};

await getCities();
</script>
