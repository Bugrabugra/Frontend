<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!--Search / Results-->
    <div class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32">
      <!--Search input-->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
        <div class="flex">
          <input
              v-model="queryIp"
              type="text"
              class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
              placeholder="Search for any IP address or leave empty to get your ip info"
          >
          <i @click="getIpInfo" class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fas fa-chevron-right"></i>
        </div>
      </div>

      <!--IP info-->
      <IPInfo v-if="ipInfo" :ipInfo="ipInfo"/>
    </div>

    <!--Map-->
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
  import IPInfo from "../components/IPInfo";
  import leaflet from "leaflet";
  import {onMounted, ref} from "vue";
  import axios from "axios";


  export default {
    name: 'Home',
    components: {
      IPInfo
    },
    setup() {
      let myMap;
      const queryIp = ref("");
      const ipInfo = ref(null);

      onMounted(() => {
        myMap = leaflet.map("mapid").setView([51.505, -0.09], 13);

        leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnV1cmEiLCJhIjoiY2tmZG15d3FpMDJiMTM0bXNjaTFnMzVqNSJ9.JN4zgUGd9sJ_j5enKZ4g9A', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYnV1cmEiLCJhIjoiY2tmZG15d3FpMDJiMTM0bXNjaTFnMzVqNSJ9.JN4zgUGd9sJ_j5enKZ4g9A'
        }).addTo(myMap);
      });

      const getIpInfo = async () => {
        try {
          const data = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_cARtvHyw3b9SjroreUZuK9umWxfsu&ipAddress=${queryIp.value}`);
          const result = data.data;
          ipInfo.value = {
            address: result.ip,
            state: result.location.region,
            timezone: result.location.timezone,
            isp: result.isp,
            lat: result.location.lat,
            lng: result.location.lng
          };

          leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(myMap);
          myMap.setView([ipInfo.value.lat, ipInfo.value.lng], 13)
        } catch (error) {
          alert(error.message)
        }
      }

      return {queryIp, ipInfo, getIpInfo}
    }
  }
</script>
