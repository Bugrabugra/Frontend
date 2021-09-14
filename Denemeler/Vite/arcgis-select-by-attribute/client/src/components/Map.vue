<template>
  <div id="map"></div>
</template>

<script>
  import {ref, computed, watch, onMounted} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "Map",
    setup() {
      // store
      const store = useStore();

      // references
      const myMap = ref(null);

      // computed
      const features = computed(() => {
        return store.getters.getFeatures;
      })

      // methods
      const initMap = () => {
        myMap.value = L.map("map");
        myMap.value.setView([41, 29.040], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap.value);

        console.log(features.value)

        const purchase = JSON.parse(
          JSON.stringify(store.getters.getFeatures)
        );

        console.log(purchase)

        // L.geoJSON(feature).addTo(myMap.value);
      };

      // mounted
      onMounted(() => {
        store.dispatch("getFeatures");
        initMap();
      });

      // watch(() => store.getters.getFeatures, features => {
      //   console.log("features: ", features);
      //   // features.forEach(feature => {
      //   //   L.geoJSON(feature).addTo(myMap.value);
      //   // })
      // })

      return {}
    }
  }
</script>

<style scoped>

</style>