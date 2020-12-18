<template>
  <div id="app">
    Leaflet


  </div>
</template>

<script>
  import L from "leaflet";


  export default {
    name: 'App',
    components: {

    },

    methods: {
      initMap() {
        const map = L.map('mapid').setView([51.505, -0.09], 13);

        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
          {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
          .addTo(map);

        map.on("click", evt => {
          console.log(evt.latlng);
          const marker = L.marker(evt.latlng,)
            .addTo(map)
          marker.bindPopup(`Example for Arjan - ${evt.latlng}`).openPopup()

        })
      }
    },

    created() {
      this.initMap();
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #mapid {
    height: 100vh;
  }
</style>
