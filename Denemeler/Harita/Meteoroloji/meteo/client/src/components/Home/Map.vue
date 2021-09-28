<template>
  <div id="map" class="absolute top-0 bottom-0 w-full">

  </div>
</template>

<script setup>
  import mapboxgl from "mapbox-gl"
  import {onMounted} from "vue";
  mapboxgl.accessToken = "pk.eyJ1IjoiYnV1cmEiLCJhIjoiY2tmZG15d3FpMDJiMTM0bXNjaTFnMzVqNSJ9.JN4zgUGd9sJ_j5enKZ4g9A"

  const initMap = () => {
    const map = new mapboxgl.Map({
      container: 'map',
      interactive: true,
      style: 'mapbox://styles/buura/ckfdn1lxl6dt019npcbm0ypx6',
      center: [32.8, 39.9],
      zoom: 9,
      pitch: 20,
    });

    const geocoder = MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      language: 'tr',
      placeholder: 'Adres Ara',
    });
  };

  onMounted(() => {
    initMap();
  });

</script>

<style scoped>

</style>