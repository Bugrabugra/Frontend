<template>
  <div class="home">
    <h1>Weather App</h1>
    <div class="enter-city">
      <input
          v-model="data.city"
          @keyup.enter="getWeather"
          type="text"
          placeholder="Enter a city"
      >
    </div>

    <div class="weather" v-if="data.weather">
      <h1>{{Math.round(data.weather.main.temp)}}&deg;</h1>
      <h2>{{data.weather.weather[0].main}}</h2>
      <h3>{{data.weather.weather[0].description}}</h3>
    </div>
  </div>
</template>

<script>
  import {reactive} from "vue";
  import axios from "axios";


  export default {
    name: 'Home',

    setup() {
      let data = reactive({
        city: "",
        weather: null
      })

      const apiURL = "http://localhost:3000/";

      const getWeather = () => {
        axios(`${apiURL}?q=${data.city}&units=metric`)
          .then(response => {
            data.weather = response.data;
            console.log(data.weather);
          })
      }

      return {data, getWeather}
    }
  }
</script>

<style lang="sass">
  .enter-city
    input
      font-size: 40px

  .weather
    margin-top: 10px
    h1
      font-size: 80px
    h1, h2, h3
     margin: 0
</style>
