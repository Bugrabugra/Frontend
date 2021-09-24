<template>
  <div class="absolute z-20 top-4 right-4">
    <button @click="changeLayerWeather" class="bg-gray-400 opacity-75 px-2 py-1 rounded text-gray-200 border border-gray-700 hover:bg-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    </button>
  </div>

  <div class="absolute z-20 top-14 right-4">
    <button @click="openMenu" class="bg-gray-400 opacity-75 px-2 py-1 rounded text-gray-200 border border-gray-700 hover:bg-gray-500">
      <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>

      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </div>
  <div id="map" class="relative w-full h-screen z-10"/>
</template>

<script>
  import L from "leaflet";
  import {onMounted, ref} from "vue";

  const wmsLayer = L.tileLayer.wms(
      'http://ows.mundialis.de/services/service?',
      {
        layers: 'TOPO-OSM-WMS'
      }
  )

  export default {
    name: "TheMap",
    setup(_, {emit}) {
      let map = null;
      const isLayerAdded = ref(false);
      const isMenuOpen = ref(false);

      const openMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
        emit("isMenuOpen", isMenuOpen.value);
      };

      const changeLayerWeather = () => {
        if (!isLayerAdded.value) {
          wmsLayer.addTo(map);
          isLayerAdded.value = true;
          console.log("add")
        } else {
          wmsLayer.remove();
          console.log("remove")
          isLayerAdded.value = false;
        }
      }

      onMounted(() => {
        map = L.map('map', {
          center: [39.9339, 32.7694],
          zoom: 10
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
      })


      return {changeLayerWeather, openMenu, isMenuOpen}
    }
  }
</script>