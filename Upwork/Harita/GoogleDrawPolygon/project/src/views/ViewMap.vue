<template>
  <div>
    <div id="viewMap" style="height: 88vh;"></div>
    <ViewForm
        style="height: 10vh;"
        @refreshMap="getTerritories"
    />
  </div>
</template>

<script>
  import ViewForm from "../components/ViewForm";


  export default {
    name: 'ViewMap',
    components: {ViewForm},
    data() {
      return {
        map: null,
        territories: [],
      }
    },

    mounted() {
      this.initMap();
    },

    methods: {
      // This example creates a simple polygon representing the Bermuda Triangle.
      initMap() {
        setTimeout(() => {
          this.map = new window.google.maps.Map(document.getElementById("viewMap"), {
            zoom: 5,
            center: { lat: 24.886, lng: -70.268 },
            mapTypeId: "terrain",
          });
        }, 1000)
      },

      getTerritories(payload) {
        (async () => {
          // Remove all features from the map
          this.map.data.forEach(feature => {
            this.map.data.remove(feature);
          })

          const res = await fetch(`http://localhost:3000/territories/${payload}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (res.status === 200) {
            this.territories = await res.json()

            this.territories.forEach(territory => {
              // let territoryShape = new window.google.maps.Polygon({
              //   paths: window.google.maps.geometry.encoding.decodePath(territory.geometry),
              //   strokeColor: "#FF0000",
              //   strokeOpacity: 0.8,
              //   strokeWeight: 2,
              //   fillColor: "#FF0000",
              //   fillOpacity: 0.35,
              // });

              // territoryShape.setMap(this.map);
              this.map.data.add({
                geometry: new google.maps.Data.Polygon([window.google.maps.geometry.encoding.decodePath(territory.geometry)]),
              })

              this.map.data.setStyle((feature) => {
                let color = "";
                if (territory.layer_name === "Layer 1") {
                  color = "#FF0000";
                } else if (territory.layer_name === "Layer 3") {
                  color = "#2fff00"
                }
                return /** @type {!google.maps.Data.StyleOptions} */ {
                  fillColor: color,
                  strokeColor: "#2d2b2b",
                  strokeWeight: 2,
                };
              });

              // Create the bounds object
              // const bounds = new window.google.maps.LatLngBounds();
              //
              // this.map.data.forEach(feature => {
              //   feature.getGeometry().forEachLatLng(latlng => {
              //     bounds.extend(latlng);
              //   })
              // })
              //
              // console.log(bounds.getCenter());

              // const marker = new window.google.maps.Marker({
              //   position: bounds.getCenter(),
              //   map: this.map,
              //   icon: {
              //     path: "",
              //     fillOpacity: 0,
              //     strokeWeight: 0
              //   },
              //   draggable: false,
              //   label: territory.territory_name
                // label: {
                //   text: territory.territory_name,
                //   color: "#FFFFFF",
                //   textShadow: "2px 2px 2px #000000"
                // },
                // icon: {
                //   path: "your icon path here",
                //   fillOpacity: 0,
                //   strokeWeight: 0
                // }
              // });
              // marker.setMap(this.map)

            })
          }
        })();
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map {
    height: 100%;
  }

  /* Optional: Makes the sample page fill the window. */
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

</style>
