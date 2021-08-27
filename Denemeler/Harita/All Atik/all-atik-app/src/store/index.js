import Vue from 'vue';
import Vuex from 'vuex';
import {Dialog, Loading, Notify} from 'quasar'
import {
  apiGetContainers,
  apiGetFilteredContainers,
  apiPatchContainer,
  apiGetContainer,
  apiGetLastCollections,
  apiGetDataStream,
  apiGetZone,
  apiGetZones,
  apiGetFilteredZones,
  apiGetInstitution
} from "../api/index";
import {svgMarkerDataStream, svgMarkerMyLocation} from "components/svgIcons";
import {i18n} from "boot/i18n";
import {apiPatchZone} from "src/api";


Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    state: {
      institution: null,
      pageSize: null,
      settings: {},
      map: null,
      resetView: false,
      containers: [],
      clickedContainer: null,
      filterChanged: false,
      queryParameterObject: {
        neighborhoodID: 0,
        streetID: 0,
        zoneID: 0,
        typeID: 0,
        fullness: "",
        fireRisk: null,
        connected: null
      },
      updatingGeometry: false,
      currentMarkerSymbol: {},
      expandContainerDetail: false,
      routeCreated: false,
      drawingManager: null,
      selectedFullness: null,
      fullnessColors: {
        countGreen: 0,
        countYellow: 0,
        countRed: 0,
        countGrey: 0,
      },
      sensorInfos: {
        sensorsIdentified: 0,
        sensorsUnidentified: 0,
        connectionProblem: 0
      },
      myLocation: null,
      myLocationMarker: null,
      counterFireRisk: 0,
      currentContainer: null,
      currentContainerLastCollections: null,
      currentContainerLastFiveCoordinates: null,
      arrayMarkerLastFiveCoordinates: [],
      currentZone: null,
      zones: []
    },

    getters: {
      getInstitution(state) {
        return state.institution;
      },

      getQueryParameterObject(state) {
        return state.queryParameterObject;
      },

      getSelectedFireRisk(state) {
        return state.queryParameterObject.fireRisk;
      },

      getFullnessColors(state) {
        return state.fullnessColors;
      },

      getSensorInfos(state) {
        return state.sensorInfos;
      },

      getPageSize(state) {
        return state.pageSize;
      },

      getMap(state) {
        return state.map;
      },

      getContainers(state) {
        return state.containers;
      },

      getClickedContainer(state) {
        return state.clickedContainer;
      },

      filterChanged(state) {
        return state.filterChanged;
      },

      getQueryParameters(state) {
        const query = Object.keys(state.queryParameterObject).map(key => {
          const value = state.queryParameterObject[key];
          if (value) {
            if (key === "fullness") { // Fullness
              if (key === "fullness" && value === "noValue") {
                return `${key}=null`;
              } else if (key === "fullness" && value === "") {
                return;
              } else {
                const [min, max] = String(value).split("-");
                if (max === "100") {
                  return `${key}_gte=${min}&${key}_lte=${max}`;
                } else {
                  return `${key}_gte=${min}&${key}_lt=${max}`;
                }
              }
            } else if (key === "fireRisk") { // Fire risk
              if (value === "yes") {
                return `${key}=true`;
              } else {
                return `${key}=false`;
              }
            } else if (key === "connected") { // Connected
              if (value === "false") {
                return `${key}=false`;
              }
            } else if (key === "device") { // Device
              if (value === "null") {
                return `${key}_eq=null`;
              } else if (value === "notnull") {
                return `${key}_ne=null`;
              }
                }
            else { // Rest
              return `${key}=${value}`;
            }
          }
        })

        console.log(query)
        console.log(query.filter(q => q !== undefined));
        console.log(query.filter(q => q !== undefined).join("&"));
        return query.filter(q => q !== undefined).join("&");
      },

      updatingGeometry(state) {
        return state.updatingGeometry;
      },

      expandContainerDetail(state) {
        return state.expandContainerDetail;
      },

      resetView(state) {
        return state.resetView;
      },

      routeCreated(state) {
        return state.routeCreated;
      },

      currentMarkerSymbol(state) {
        return state.currentMarkerSymbol;
      },

      getSettings(state) {
        return state.settings;
      },

      getDrawingManager(state) {
        return state.drawingManager;
      },

      getSelectedFullness(state) {
        return state.selectedFullness;
      },

      getMyLocation(state) {
        return state.myLocation;
      },

      getMyLocationMarker(state) {
        return state.myLocationMarker;
      },

      getCounterFireRisk(state) {
        return state.counterFireRisk;
      },

      getCurrentContainer(state) {
        return state.currentContainer;
      },

      getCurrentContainerLastCollections(state) {
        return state.currentContainerLastCollections;
      },

      getCurrentContainerLastFiveCoordinates(state) {
        return state.currentContainerLastFiveCoordinates;
      },

      getArrayMarkerLastFiveCoordinates(state) {
        return state.arrayMarkerLastFiveCoordinates;
      },

      getCurrentZone(state) {
        return state.currentZone;
      },

      getZones(state) {
        return state.zones;
      }
    },

    mutations: {
      setInstitution(state, payload) {
        state.institution = payload;
      },

      resetFullnessValues(state) {
        state.fullnessColors.countGreen = 0;
        state.fullnessColors.countGrey = 0;
        state.fullnessColors.countRed = 0;
        state.fullnessColors.countYellow = 0;
      },

      resetSensorInfos(state) {
        state.sensorInfos.sensorsIdentified = 0;
        state.sensorInfos.sensorsUnidentified = 0;
        state.sensorInfos.connectionProblem = 0;
      },

      increaseFullnessColors(state, payload) {
        state.fullnessColors = payload;
      },

      increaseSensorInfos(state, payload) {
        state.sensorInfos = payload;
      },

      setPageSize(state, payload) {
        state.pageSize = payload;
      },

      setMap(state, payload) {
        state.map = payload;
      },

      setContainers(state, payload) {
        state.containers = payload;
      },

      setClickedContainer(state, payload) {
        state.clickedContainer = payload;
      },

      changeFilter(state, payload) {
        state.filterChanged = payload;
      },

      updateQueryParameter(state, payload) {
        state.queryParameterObject[payload.query] = payload.value;
      },

      truncateQueryParameter(state) {
        state.queryParameterObject = {
          neighborhoodID: 0,
          streetID: 0,
          zoneID: 0,
          typeID: 0,
          fullness: "",
          device: null,
          fireRisk: null,
          connected: null
        }
      },

      updatingGeometry(state) {
        state.updatingGeometry = !state.updatingGeometry;
      },

      expandContainerDetail(state, payload) {
        state.expandContainerDetail = payload;
      },

      resetView(state, payload) {
        state.resetView = payload;
      },

      createRoute(state, payload) {
        state.routeCreated = payload;
      },

      setCurrentMarkerSymbol(state, payload) {
        state.currentMarkerSymbol = payload;
      },

      setSettings(state, payload) {
        state.settings = payload;
      },

      setDrawingManager(state, payload) {
        state.drawingManager = payload;
      },

      setSelectedFullness(state, payload) {
        state.selectedFullness = payload;
      },

      setMyLocation(state, payload) {
        state.myLocation = payload;
      },

      setMyLocationMarker(state, payload) {
        state.myLocationMarker = payload;
      },

      setCounterFireRisk(state, payload) {
        state.counterFireRisk = payload;
      },

      setCurrentContainer(state, payload) {
        state.currentContainer = payload;
      },

      setCurrentContainerLastCollections(state, payload) {
        state.currentContainerLastCollections = payload;
      },

      setCurrentContainerLastFiveCoordinates(state, payload) {
        state.currentContainerLastFiveCoordinates = payload;
      },

      setArrayMarkerLastFiveCoordinates(state, payload) {
        state.arrayMarkerLastFiveCoordinates.push(payload);
      },

      setCurrentZone(state, payload) {
        state.currentZone = payload;
      },

      setZones(state, payload) {
        state.zones = payload;
      }
    },

    actions: {
      setInstitution(context) {
        apiGetInstitution(context.getters.getSettings.jwt)
          .then(response => {
            context.commit("setInstitution", response.data);
          })
      },

      setPageSize({commit}, payload) {
        commit("setPageSize", payload);
      },

      setMap({commit}, payload) {
        commit("setMap", payload);
      },

      getContainers(context) {
        Loading.show({
          delay: 0,
          message: `${i18n.t("notifications.lblLoading")}<br/>`,
          spinnerColor: "blue-6"
        });

        console.log(context.getters.getSettings.jwt)
        apiGetContainers(context.getters.getSettings.jwt)
          .then(response => {
            const featuresWithGeometry = response.data.filter(container => {
              return container.latitude !== null && container.longitude !== null;
            });

            context.commit("changeFilter", true);
            context.dispatch("setContainers", featuresWithGeometry)
              .then(() => {
                context.dispatch("populateFullness");
                context.dispatch("populateSensorInfo");
              })
          }).catch(error => {
          console.log(i18n.t("errors.lblLoadContainers"), error);
        })
      },

      setContainers({commit}, payload) {
        commit("setContainers", payload);
      },

      setClickedContainer(context, payload) {
        context.commit("setClickedContainer", payload);
        context.commit("setCurrentContainer", payload ? payload.container : null)
        // context.dispatch("setCurrentContainerLastCollections", payload ? payload.container.id : null);
        context.commit("expandContainerDetail", true);
      },

      changeFilter({commit}, payload) {
        commit("changeFilter", payload);
      },

      updateQueryParameter({commit}, payload) {
        commit("updateQueryParameter", payload);
      },

      updateGeometry(context, payload) {
        apiPatchContainer(payload, context.getters.getSettings.jwt)
          .then(() => {
            Dialog.create({
              title: i18n.t("notifications.lblWarning"),
              ok: {label: i18n.t("notifications.btnOK")},
              message: `${context.getters.getClickedContainer.container.containerName} ${i18n.t("notifications.lblAddGeometry")}`
            })

            context.dispatch("updatingGeometry");
            context.dispatch("queryContainers");
          })
          .catch(error => {
            console.log(i18n.t("errors.lblUpdateGeometry"), error);
          })
      },

      updatingGeometry(context) {
        context.commit("updatingGeometry");
        if (context.state.clickedContainer) {
          context.state.clickedContainer.marker.setIcon(context.getters.currentMarkerSymbol);
        }
      },

      addGeometry(context, payload) {
        console.log(payload);
        apiPatchContainer(payload, context.getters.getSettings.jwt)
          .then(() => {
            Dialog.create({
              title: i18n.t("notifications.lblWarning"),
              ok: {label: i18n.t("notifications.btnOK")},
              message: `ID: ${payload.containerID} ${i18n.t("notifications.lblAddGeometry")}`
            })
          })
          .catch(error => {
            console.log(i18n.t("errors.lblAddGeometry"), error);
          })
      },

      expandContainerDetail({commit}, payload) {
        commit("expandContainerDetail", payload);
      },

      resetView({commit}, payload) {
        commit("resetView", payload);
      },

      createRoute({commit}, payload) {
        commit("createRoute", payload);
      },

      setCurrentMarkerSymbol({commit}, payload) {
        commit("setCurrentMarkerSymbol", payload);
      },

      setSettings({commit}, payload) {
        commit("setSettings", payload);
      },

      setDrawingManager({commit}, payload) {
        commit("setDrawingManager", payload);
      },

      setSelectedFullness({commit}, payload) {
        commit("setSelectedFullness", payload);
      },

      increaseFullnessColors({commit}, payload) {
        commit("increaseFullnessColors", payload);
      },

      resetFullnessValues({commit}) {
        commit("resetFullnessValues");
      },

      populateFullness(context) {
        context.commit("resetFullnessValues");

        let green = 0;
        let yellow = 0;
        let red = 0;
        let grey = 0;

        context.getters.getContainers.forEach(container => {
          if (container.fullness === null) {
            grey++;
          } else if (container.fullness >= 0 && container.fullness < 50) {
            green++;
          } else if (container.fullness >= 50 && container.fullness < 75) {
            yellow++;
          } else if (container.fullness >= 75 && container.fullness <= 100) {
            red++;
          }
        })

        context.commit(
          "increaseFullnessColors",
          {
            countGreen: green,
            countYellow: yellow,
            countRed: red,
            countGrey: grey
          }
          )

        if (context.getters.getFullnessColors.countRed) {
          if (context.getters.getSettings.page === "main-map-page") {
            const messageFullness = i18n.t("notifications.lblFullContainers")
            Notify.create({
              type: 'info',
              message: `${messageFullness} ${context.getters.getFullnessColors.countRed}`,
              actions: [{ icon: 'close', color: 'white' }],
              icon: "local_shipping",
              classes: "notifier-fullness",
            })
          }
        }
      },

      populateSensorInfo(context) {
        context.commit("resetSensorInfos");

        let identified = 0;
        let unidentified = 0;
        let problem = 0;

        context.getters.getContainers.forEach(container => {
          if (container.device !== null) {
            identified++;
          } else if (container.device === null) {
            unidentified++;
          }

          if (container.connected === false) {
            problem++;
          }
        })

        context.commit(
          "increaseSensorInfos",
          {
            sensorsIdentified: identified,
            sensorsUnidentified: unidentified,
            connectionProblem: problem
          }
        )
      },

      queryContainers(context) {
        Loading.show({
          delay: 0,
          message: `${i18n.t("notifications.lblLoading")}<br/>`,
          spinnerColor: "blue-6"
        });

        if (context.getters.getQueryParameters) {
          apiGetFilteredContainers(context.getters.getQueryParameters, context.getters.getSettings.jwt)
            .then(response => {
              const featuresWithGeometry = response.data.filter(container => {
                return container.latitude !== null && container.longitude !== null;
              });

              context.dispatch("setContainers", featuresWithGeometry)
                .then(() => {
                  context.dispatch("populateFullness");
                  context.dispatch("populateSensorInfo");
                  context.dispatch("changeFilter", true);
                });
            })
        } else {
          context.dispatch("getContainers");
        }
      },

      selectFullness(context) {
        if (context.getters.getSelectedFullness) {
          context.dispatch(
            "updateQueryParameter",
            {
              query: "fullness",
              value: context.getters.getSelectedFullness.value
            }
          )
          context.dispatch("queryContainers");
        }
      },

      setMyLocation(context) {
        if (context.getters.getMyLocationMarker) {
          context.getters.getMyLocationMarker.setMap(null);
        }

        navigator.geolocation.getCurrentPosition(
          response => {
            console.log(response);
            const payload = {
              lat: response.coords.latitude,
              lng: response.coords.longitude
            }
            context.commit("setMyLocation", payload);

            const markerMyLocation = new window.google.maps.Marker({
              position: context.getters.getMyLocation,
              title: i18n.t("myLocation.lblTitle"),
              icon: {
                path: svgMarkerMyLocation,
                fillColor: "grey",
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new window.google.maps.Point(15, 15),
              },
              map: context.getters.getMap
            })

            context.getters.getMap.panTo(context.getters.getMyLocation);
            context.getters.getMap.setZoom(17);

            context.dispatch("setMyLocationMarker", markerMyLocation)
          }, error => {
            console.log(i18n.t("errors.lblMyLocation"), error)
          },
          {
            enableHighAccuracy: true,
            maximumAge: 1,
          }
        )

      },

      setMyLocationMarker(context, payload) {
        context.commit("setMyLocationMarker", payload);
      },

      setCounterFireRisk(context, payload) {
        context.commit("setCounterFireRisk", payload);

        Notify.create({
          type: 'negative',
          message: `${i18n.t("notifications.lblFireRisk")} ${context.getters.getCounterFireRisk}`,
          actions: [
            {
              icon: "visibility",
              color: "white",
              handler: () => {
                context.commit("updateQueryParameter", {query: "fireRisk", value: "yes"});
                context.dispatch("queryContainers");
              },
              label: i18n.t("notifications.btnClickToSee")
            },
            {
              icon: 'close',
              color: 'white',
              class: "close-button"
            }
            ],
          icon: "local_fire_department",
          timeout: 3000000,
          classes: "notifier-fire-risk",
        })
      },

      setQueryPolygon({commit}, payload) {
        commit("setQueryPolygon", payload);
      },

      setCurrentContainer(context, payload) {
        apiGetContainer(payload, context.getters.getSettings.jwt)
          .then(response => {
            context.commit("setCurrentContainer", response.data);
            context.commit("setClickedContainer", {container: response.data});
            context.dispatch("setCurrentContainerLastCollections", response.data.id);
          }).catch(error => {
          console.log(i18n.t("errors.lblGetContainer"), error);
        })
      },

      getContainer(context, payload) {
        apiGetContainer(payload, context.getters.getSettings.jwt)
          .then(response => {
            if (response.data.latitude && response.data.longitude) {
              context.getters.getMap.setCenter({
                lat: response.data.latitude,
                lng: response.data.longitude
              });
              context.getters.getMap.setZoom(20);
            }
          })
      },

      setCurrentContainerLastCollections(context, payload) {
        if (context.getters.getSettings.page === "container-page") {
          apiGetLastCollections(payload, context.getters.getSettings.jwt)
            .then(response => {
              context.commit("setCurrentContainerLastCollections", response.data);
            })
        }
      },

      setCurrentContainerLastFiveCoordinates(context, payload) {
        apiGetDataStream(payload, context.getters.getSettings.jwt)
          .then(response => {
            console.log(response.data);
            context.commit("setCurrentContainerLastFiveCoordinates", response.data);

            response.data.forEach(calculation => {
              if (calculation.latitude !== 0 && calculation.longitude !== 0) {
                const markerLastFiveCoordinates = new window.google.maps.Marker({
                  position: {
                    lat: calculation.latitude,
                    lng: calculation.longitude
                  },
                  icon: {
                    path: svgMarkerDataStream,
                    fillColor: "grey",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 2,
                    anchor: new window.google.maps.Point(10, 10),
                  },
                  label: {
                    text: String(calculation.sensorReadDate),
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "#14586a"
                  },
                  map: context.getters.getMap
                })

                context.commit("setArrayMarkerLastFiveCoordinates", markerLastFiveCoordinates);
              }
            })
          })
      },

      setArrayMarkerLastFiveCoordinates({commit}, payload) {
        commit("setArrayMarkerLastFiveCoordinates", payload);
      },

      selectZoneGeometry(context, payload) {
        context.dispatch("clearZones")
          .then(() => {
            apiGetZone(payload, context.getters.getSettings.jwt)
              .then(response => {
                // context.commit("setCurrentZone", response.data);
                if (response.data.geometry) {
                  const encodedGeometry = response.data.geometry;
                  const decodedGeometry = window.google.maps.geometry.encoding.decodePath(encodedGeometry);

                  // Viewing the parsed polygons
                  const poly = new window.google.maps.Polygon({
                    paths: decodedGeometry,
                    strokeColor: "#07abd9",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#81d0e8",
                    fillOpacity: 0.20,
                    label: response.data.name
                  });

                  poly.setMap(context.state.map);

                  let bounds = new window.google.maps.LatLngBounds;
                  decodedGeometry.forEach(function(latLng) {
                    bounds.extend(latLng);
                  });

                  context.state.zones.push(poly);
                  context.state.map.fitBounds(bounds);
                }
              })
          })
      },

      getZoneGeometry(context, payload) {
        // payload = zoneID
        // result => {geometry: geometry}
        apiGetZone(payload, context.getters.getSettings.jwt)
          .then(response => {
            console.log(response);

            context.commit("setCurrentZone", response.data);

            if (response.data.geometry) {
              const encodedGeometry = response.data.geometry;
              const decodedGeometry = window.google.maps.geometry.encoding.decodePath(encodedGeometry);

              let bounds = new window.google.maps.LatLngBounds;
              decodedGeometry.forEach(function(latLng) {
                bounds.extend(latLng);
              });

              context.state.map.fitBounds(bounds);
            }
          })
          .catch(error => {
            console.log(i18n.t("errors.lblLoadZones"), error)
          })
      },

      setZoneGeometry(context, payload) {
        // payload = zoneID
        // result => {geometry: geometry}
        apiPatchZone(payload.zoneID, payload.geometry, context.getters.getSettings.jwt)
          .then(response => {
            console.log(response);
            Dialog.create({
              title: i18n.t("notifications.lblWarning"),
              ok: {label: i18n.t("notifications.btnOK")},
              message: `ID ${payload.zoneID} ${i18n.t("notifications.lblAddGeometry")}`
            })
          })
      },

      clearZones(context) {
        context.state.zones.forEach(zone => {
          zone.setMap(null);
        });

        context.commit("setZones", []);
      },

      drawZones(context) {
        context.dispatch("clearZones");

        setTimeout(() => {
          apiGetZones(context.getters.getSettings.jwt)
            .then(response => {
              console.log(response);

              response.data.forEach(zone => {
                if (zone.geometry) {
                  const decodedGeometry = window.google.maps.geometry.encoding.decodePath(zone.geometry);

                  // Viewing the parsed polygons
                  const poly = new window.google.maps.Polygon({
                    paths: decodedGeometry,
                    strokeColor: "#07abd9",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#81d0e8",
                    fillOpacity: 0.20,
                    label: zone.name
                  });

                  poly.setMap(context.state.map);

                  let bounds = new window.google.maps.LatLngBounds;
                  decodedGeometry.forEach(function(latLng) {
                    bounds.extend(latLng);
                  });

                  // Mouse over info bubble
                  const infoWindow = new window.google.maps.InfoWindow();

                  // Mouse over highlight property
                  window.google.maps.event.addListener(poly, 'mouseover', (e) => {
                    poly.setOptions({fillColor: "#00FF00"});
                    infoWindow.setContent(`${zone.name}`);
                    infoWindow.setPosition(bounds.getCenter());
                    infoWindow.open(context.state.map);
                  });

                  // Mouse out highlight property
                  window.google.maps.event.addListener(poly, 'mouseout', (e) => {
                    poly.setOptions({fillColor: "#81d0e8"});
                    infoWindow.setPosition(null);
                  });

                  context.state.zones.push(poly);
                }
              })

              console.log(context.state.zones)
            })
        }, 700)
      },

      drawFilteredZones(context, zoneIDs) {
        context.dispatch("clearZones");

        console.log(zoneIDs)

        setTimeout(() => {
          apiGetFilteredZones(zoneIDs, context.getters.getSettings.jwt)
            .then(response => {
              response.data.forEach(zone => {
                if (zone.geometry && zone.status === "ACTIVE") {
                  const decodedGeometry = window.google.maps.geometry.encoding.decodePath(zone.geometry);

                  // Viewing the parsed polygons
                  const poly = new window.google.maps.Polygon({
                    paths: decodedGeometry,
                    strokeColor: "#d90785",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#e881ce",
                    fillOpacity: 0.20,
                    label: zone.name
                  });

                  poly.setMap(context.state.map);

                  let bounds = new window.google.maps.LatLngBounds;
                  decodedGeometry.forEach(function(latLng) {
                    bounds.extend(latLng);
                  });

                  // Mouse over info bubble
                  const infoWindow = new window.google.maps.InfoWindow();

                  // Mouse over highlight property
                  window.google.maps.event.addListener(poly, 'mouseover', (e) => {
                    poly.setOptions({fillColor: "#00FF00"});
                    infoWindow.setContent(`${zone.name}`);
                    infoWindow.setPosition(bounds.getCenter());
                    infoWindow.open(context.state.map);
                  });

                  // Mouse out highlight property
                  window.google.maps.event.addListener(poly, 'mouseout', (e) => {
                    poly.setOptions({fillColor: "#81d0e8"});
                    infoWindow.setPosition(null);
                  });

                  context.state.zones.push(poly);
                }
              })

              console.log(context.state.zones)
            })
        }, 700)
      }
    }
  })
}
