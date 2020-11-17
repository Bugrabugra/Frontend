<template>
  <div id="app">
    <div id="map" ref="map"></div>

  </div>
</template>

<script>
  export default {
    name: "Citizen",
    data() {
      return {
        map: null
      }
    },

    methods: {
      getMap(callback) {
        let vm = this;
        function checkForMap() {
          if (vm.map) callback(vm.map)
          else setTimeout(checkForMap, 200)
        }
        checkForMap();
      }
    },

    mounted() {
      this.map = new window.google.maps.Map(this.$refs["map"], {
        center: {lat: -25.344, lng: 131},
        zoom: 4
      })
    }
  }
</script>

<style scoped>
  #map {
    height: 600px;
    background: green;
  }
</style>