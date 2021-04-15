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
  import {
    svgMarkerMunicipalityCenter,
    svgMarkerDisposalArea,
    svgMarkerFireRisk,
    svgMarkerType1,
    svgMarkerType2,
    svgMarkerType3,
    svgMarkerType4
  } from "components/svgIcons";


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
          title: this.$t("pageMainMap.map.lblMunicipalityCenter"),
          icon: {
            path: svgMarkerMunicipalityCenter,
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
          title: this.$t("pageMainMap.map.lblDisposalCenter"),
          icon: {
            path: svgMarkerDisposalArea,
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
              return svgMarkerFireRisk;
            } else {
              if (container.typeID === 1) {
                return svgMarkerType1;
              } else if (container.typeID === 2) {
                return svgMarkerType2;
              } else if (container.typeID === 3) {
                return svgMarkerType3;
              } else if (container.typeID === 4) {
                return svgMarkerType4;
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
                color: "#554b4b"
              } :
              null
              // {
              //   text: String(container.id),
              //   fontWeight: "bold",
              //   fontSize: "20px",
              //   color: "#dc4a4a"
              // }
          });

          marker.setMap(this.getMap);

          if (this.getSettings.page === "main-map-page") {
            marker.addListener("click", () => {
              this.$store.dispatch("setClickedContainer", {container: container, marker: marker});
              this.$store.dispatch("setCurrentMarkerSymbol", this.getClickedContainer.marker.getIcon());
            })
          }

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
            gridSize: 40,
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
                    console.log(this.$t("pageMainMap.map.lblDirectionsError") + status);
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
