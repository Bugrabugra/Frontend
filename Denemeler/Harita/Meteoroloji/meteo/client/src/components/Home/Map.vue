<template>
  <div id="map" class="top-0 bottom-0 w-full absolute">
    <button class="top-20 right-20 bg-red-400 px-2 py-1 rounded-md">
      Admin
    </button>
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
  };

  onMounted(() => {
    initMap();
  });

</script>
