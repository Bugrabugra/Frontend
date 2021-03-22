<template>
  <q-layout id="map">

  </q-layout>
</template>

<script>
  import {loadedGoogleMapsAPI} from "boot/google-map";
  import MarkerClusterer from '@googlemaps/markerclustererplus';


  export default {
    name: "Map",

    data() {
      return {
        drawingManager: null,
        markers: [],
        markerCluster: null
      }
    },

    computed: {
      filterChanged() {
        return this.$store.getters.filterChanged;
      },

      updatingGeometry() {
        return this.$store.getters.updatingGeometry;
      },

      resetView() {
        return this.$store.getters.resetView;
      },

      createRoutes() {
        return this.$store.getters.routeCreated;
      }
    },

    methods: {
      initMap() {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 8,
          center: {
            lat: 40.98390570573965,
            lng: 29.13268504720865
          },
          mapId: "b15068e07cf8d4c6",
        });

        this.$store.dispatch("setMap", map);

        this.$store.getters.getMap.addListener("click", () => {
          this.$store.dispatch("getContainer", null);
          this.$store.dispatch("expandContainerDetail", false);
        })

        this.$store.dispatch("getContainers");
      },

      drawContainers() {
        console.log("draw containers")
        if (this.markerCluster) {
          this.markerCluster.clearMarkers();
        }

        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

        this.markers = [];

        this.markers = this.$store.getters.getContainers.map(container => {
          const fullness = () => {
            if (container.fullness === null) {
              return "grey"
            } else if (container.fullness >= 0 && container.fullness < 50) {
              return "#6aa454"
            } else if (container.fullness >= 50 && container.fullness < 75) {
              return "#fdc740"
            } else if (container.fullness >= 75 && container.fullness <= 100) {
              return "#ef4343"
            }
          };

          const svgIconChooser = () => {
            if (container.typeID === 12715) {
              return "M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z"
            } else {
              return "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            }
          }

          const svgMarker = {
            path: svgIconChooser(),
            fillColor: fullness(),
            fillOpacity: 1,
            strokeWeight: 0.5,
            strokeColor: "#a0a0a0",
            rotation: 0,
            scale: 2.0,
            anchor: new window.google.maps.Point(0, 0),
          };

          const containerLatLng = {
            lat: container.latitude,
            lng: container.longitude
          };

          const marker = new window.google.maps.Marker({
            position: containerLatLng,
            title: container.containerName,
            icon: svgMarker,
            animation: window.google.maps.Animation.DROP,
            clickable: true,
          });

          marker.setMap(this.$store.getters.getMap);

          marker.addListener("click", () => {
            this.$store.dispatch("getContainer", {container: container, marker: marker});
            this.$store.dispatch("setCurrentMarkerSymbol", this.$store.getters.getContainer.marker.getIcon());
          })

          marker.addListener("dragend", (evt) => {
            this.$store.dispatch(
              "updateGeometry",
              {
                containerID: this.$store.getters.getContainer.container.id,
                latitude: evt.latLng.lat(),
                longitude: evt.latLng.lng()
              }
            );
          })

          return marker;
        });

        this.markerCluster = new MarkerClusterer(
          this.$store.getters.getMap,
          this.markers,
          {
            maxZoom: 14,
            gridSize: 50,
            styles: [
              {
                anchorText: [20, 2],
                width: 50,
                height: 50,
                url: "/icons/cluster-icons/mm1.png",
                textColor: 'white',
                textSize: 12,
                fontWeight: "bold"
              },
              {
                anchorText: [19, -43],
                width: 140,
                height: 140,
                url: "/icons/cluster-icons/mm2.png",
                textColor: 'white',
                textSize: 14,
                fontWeight: "bold",
              },
              {
                anchorText: [25, -3],
                width: 70,
                height: 70,
                url: "/icons/cluster-icons/mm3.png",
                textColor: 'white',
                textSize: 16,
                fontWeight: "bold"
              }
            ]
          }
        );

        this.$q.loading.hide();
        this.$store.dispatch("changeFilter", false);
      }
    },

    watch: {
      filterChanged() {
        if (this.filterChanged) {
          this.drawContainers();
        }
      },

      updatingGeometry() {
        if (this.updatingGeometry) {
          this.$store.getters.getContainer.marker.setDraggable(true);
          this.$store.getters.getContainer.marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#11eac8",
            fillOpacity: 0.8,
            strokeWeight: 1
          })
        } else {
          this.$store.getters.getContainer.marker.setDraggable(false);
        }
      },

      resetView() {
        this.$store.getters.getMap.setCenter({ lat: 40.98390570573965, lng: 29.13268504720865 });
        this.$store.getters.getMap.setZoom(8);
        this.$store.dispatch("resetView", false);
      },

      createRoutes() {
        if (this.$store.getters.routeCreated) {
          const stations = this.$store.getters.getContainers.map(container => {
            return {lat: container.latitude, lng: container.longitude, name:container.containerName};
          });

          // Divide route to several parts because max stations limit is 25 (23 waypoints + 1 origin + 1 destination)
          let parts = []

          for (let i = 0, max = 24; i < stations.length; i = i + max)
            parts.push(stations.slice(i, i + max + 1));

          // Service callback to process service results
          const service_callback = (response, status) => {
            console.log(response)
            if (status !== 'OK') {
              console.log('Directions request failed due to ' + status);
              return;
            }

            const renderer = new window.google.maps.DirectionsRenderer;
            renderer.setMap(this.$store.getters.getMap);
            renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
            renderer.setDirections(response);
          };

          // Send requests to service to get route (for stations count <= 25 only one request will be sent)
          for (let i = 0; i < parts.length; i++) {

            // Waypoints does not include first station (origin) and last station (destination)
            const waypoints = [];
            for (let j = 1; j < parts[i].length - 1; j++)
              waypoints.push({location: parts[i][j], stopover: false});

            // Service options
            const service_options = {
              origin: parts[i][0],
              destination: parts[i][parts[i].length - 1],
              waypoints: waypoints,
              travelMode: 'DRIVING',
              optimizeWaypoints: true
            };

            // Send request
            const service = new window.google.maps.DirectionsService;
            service.route(service_options, service_callback);
          }

          this.$store.dispatch('createRoute', false);
        }
      }
    },

    mounted() {
      // Initializing the Google Maps API when the page is created
      loadedGoogleMapsAPI.then(() => {
        this.initMap();
      })
    }
  }
</script>

<style scoped>
  #map{
    height: 100% !important;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
