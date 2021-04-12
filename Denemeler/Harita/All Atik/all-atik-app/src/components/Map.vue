<template>
  <div>
    <q-layout id="map">

    </q-layout>
  </div>

</template>

<script>
  import {loadedGoogleMapsAPI} from "boot/google-map";
  import MarkerClusterer from '@googlemaps/markerclustererplus';
  import {mapGetters} from "vuex";
  import {axios} from "boot/axios";


  export default {
    name: "Map",

    data() {
      return {
        drawingManager: null,
        markers: [],
        markerCluster: null,
        counterFireRisk: 0,
        directionsRenderer: null,
        coordinatesMunicipalityCenter: {
          lat: 40.9828807765619,
          lng: 29.116861107227084
        },
        coordinatesDisposalArea: {
          lat: 40.97841698244163,
          lng: 29.13004295270447
        }
      }
    },

    computed: {
      ...mapGetters([
        "filterChanged",
        "updatingGeometry",
        "resetView",
        "routeCreated",
        "getMyLocation",
        "getSettings",
        "getMap",
        "getContainers",
        "getClickedContainer",
      ])
    },

    methods: {
      initMap() {
        let zoom;
        let lat;
        let lng;

        if (this.getSettings.page === "main-map-page") {
          zoom = 10
          lat = 40.98390570573965;
          lng = 29.13268504720865;
        } else if (this.getSettings.page === "container-page") {
          zoom = 19
          lat = parseFloat(this.getSettings.lat);
          lng = parseFloat(this.getSettings.lng);
        }

        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: zoom,
          center: {
            lat: lat,
            lng: lng
          },
          mapId: "b15068e07cf8d4c6",
        });

        this.$store.dispatch("setMap", map);

        this.getMap.addListener("click", () => {
          this.$store.dispatch("setClickedContainer", null);
          this.$store.dispatch("expandContainerDetail", false);
        })

        this.$store.dispatch("getContainers");

        // Municipality center marker
        const markerMunicipalityCenter = new window.google.maps.Marker({
          position: {
            lat: this.coordinatesMunicipalityCenter.lat,
            lng: this.coordinatesMunicipalityCenter.lng
          },
          title: "Belediye Merkez",
          icon: {
            path:
              "M0,21V10L7.5,5L15,10V21H10V14H5V21H0M24,2V21H17V8.93L16,8.27V6H14V6.93L10,4.27V2H24M21,14H19V16H21V14M21,10H19V12H21V10M21,6H19V8H21V6Z",
            fillColor: "#5665db",
            fillOpacity: 1,
            strokeWeight: 0,
            rotation: 0,
            scale: 1,
            anchor: new window.google.maps.Point(15, 30),
          },
          map: this.getMap
        })

        // Municipality center marker
        const markerDisposalArea = new window.google.maps.Marker({
          position: {
            lat: this.coordinatesDisposalArea.lat,
            lng: this.coordinatesDisposalArea.lng
          },
          title: "Çöp Döküm Merkezi",
          icon: {
            path:
              "M4,18V20H8V18H4M4,14V16H14V14H4M10,18V20H14V18H10M16,14V16H20V14H16M16,18V20H20V18H16M2,22V8L7,12V8L12,12V8L17,12L18,2H21L22,12V22H2Z",
            fillColor: "#5665db",
            fillOpacity: 1,
            strokeWeight: 0,
            rotation: 0,
            scale: 1,
            anchor: new window.google.maps.Point(15, 15),
          },
          map: this.getMap
        })
      },

      drawContainers() {
        if (this.markerCluster) {
          this.markerCluster.clearMarkers();
        }

        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

        this.markers = [];
        this.counterFireRisk = 0;

        this.markers = this.getContainers.map(container => {
          if (container.fireRisk === true) {
            this.counterFireRisk++;
          }

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

          // TODO konteyner tiplerini gir + yangın riski
          const svgIconChooser = () => {
            if (container.fireRisk === true) {
              return "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"
            } else {
              if (container.typeID === 12715) {
                return "M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z"
              } else {
                return "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
              }
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
            anchor: new window.google.maps.Point(12, 10),
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
            label: this.getSettings.page === "container-page" ?
              {
                text: String(container.id),
                fontWeight: "bold",
                fontSize: "20px",
                color: "#dc4a4a"
              } :
              {
                text: String(container.id),
                fontWeight: "bold",
                fontSize: "20px",
                color: "#dc4a4a"
              }
          });

          marker.setMap(this.getMap);

          marker.addListener("click", () => {
            this.$store.dispatch("setClickedContainer", {container: container, marker: marker});
            this.$store.dispatch("setCurrentMarkerSymbol", this.getClickedContainer.marker.getIcon());
          })

          marker.addListener("dragend", (evt) => {
            this.$store.dispatch(
              "updateGeometry",
              {
                containerID: this.getClickedContainer.container.id,
                latitude: evt.latLng.lat(),
                longitude: evt.latLng.lng()
              }
            );
          })

          return marker;
        });

        if (this.getSettings.page === "main-map-page") {
          if (this.counterFireRisk > 0) {
            this.$store.dispatch("setCounterFireRisk", this.counterFireRisk);
          }
        }

        // TODO CLUSTERI GERI AÇ
        this.markerCluster = new MarkerClusterer(
          this.getMap,
          this.markers,
          {
            maxZoom: 14,
            gridSize: 30,
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
      },
    },

    watch: {
      filterChanged() {
        if (this.filterChanged) {
          this.drawContainers();
        }
      },

      updatingGeometry() {
        if (this.updatingGeometry) {
          this.getClickedContainer.marker.setDraggable(true);
          this.getClickedContainer.marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#11eac8",
            fillOpacity: 0.8,
            strokeWeight: 1
          })
        } else {
          this.getClickedContainer.marker.setDraggable(false);
        }
      },

      resetView() {
        this.getMap.setCenter({ lat: 40.98390570573965, lng: 29.13268504720865 });
        this.getMap.setZoom(8);
        // this.$store.dispatch("getContainers");
        // this.$store.dispatch("populateFullness");
        this.$store.dispatch("resetView", false);
      },

      routeCreated() {
        if (this.directionsRenderer) {
          this.directionsRenderer.setMap(null);
          this.directionsRenderer = null;
        }

        if (!this.routeCreated) {
          const addMarker = (position, i) => {
            return new window.google.maps.Marker({
              // @see http://stackoverflow.com/questions/2436484/how-can-i-create-numbered-map-markers-in-google-maps-v3 for numbered icons
              icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + i + '|FF0000|000000',
              position: position,
              map: this.getMap
            })
          }

          let stations = this.getContainers.map(container => {
            return {
              lat: container.latitude,
              lng: container.longitude,
              name: container.containerName,
              id: container.id
            };
          });

          if (this.getSettings.baseURL === "http://localhost:3000") {
            const arrayStationsID = stations.map(station => {
              return station.id
            })

            axios.post("http://localhost:3001", arrayStationsID)
              .then(response => {
                console.log(response.data)
                let newStations = [];

                response.data.forEach(id => {
                  newStations.push(
                    stations.filter(station => {
                      return station.id === id;
                    })[0]
                  )
                })

                stations = newStations;

                console.log("New stations", newStations)

                stations.unshift({
                  lat: this.coordinatesMunicipalityCenter.lat,
                  lng: this.coordinatesMunicipalityCenter.lng,
                  name: "Municipality Center",
                  id: 1000
                })

                stations.push({
                  lat: this.coordinatesDisposalArea.lat,
                  lng: this.coordinatesDisposalArea.lng,
                  name: "Disposal Area",
                  id: 1001
                })

                // Service callback to process service results
                const service_callback = (response, status) => {
                  console.log(response)
                  if (status !== 'OK') {
                    console.log('Directions request failed due to ' + status);
                    return;
                  }
                  let markerCounter = 1;

                  this.directionsRenderer = new window.google.maps.DirectionsRenderer;
                  this.directionsRenderer.setMap(this.getMap);
                  this.directionsRenderer.setOptions({
                    suppressMarkers: false,
                    preserveViewport: true,
                    suppressInfoWindows: false,
                  });
                  this.directionsRenderer.setDirections(response);

                  // add custom markers
                  const route = response.routes[0];
                  // start marker
                  addMarker(route.legs[0].start_location, markerCounter++);
                  // the rest
                  for (let i = 0; i < route.legs[0].via_waypoints.length; i++) {
                    addMarker(route.legs[0].via_waypoints[i], markerCounter++);
                  }
                };

                // Send requests to service to get route
                // (for stations count <= 25 only one request will be sent)
                const waypoints = [];
                for (let j = 1; j < stations.length - 1; j++)
                  waypoints.push({location: {lat: stations[j].lat, lng: stations[j].lng}, stopover: false});

                console.log("Waypoints", waypoints);


                // Service options
                const service_options = {
                  origin: stations[0],
                  destination: stations[stations.length - 1],
                  waypoints: waypoints,
                  travelMode: 'DRIVING',
                  optimizeWaypoints: true
                };

                // Send request
                // TODO

                const directionsService = new window.google.maps.DirectionsService;
                directionsService.route(service_options, service_callback);

              }).catch(error => {
              console.log(error)
            })
          }

          // Adding municipality center and disposal area coordinates to stations

        }

        this.$store.dispatch('createRoute', false);
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
