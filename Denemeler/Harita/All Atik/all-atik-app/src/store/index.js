import Vue from 'vue';
import Vuex from 'vuex';
import {Dialog, Loading, Notify} from 'quasar'
import {
  apiGetContainers,
  apiGetFilteredContainers,
  apiPatchContainer,
  apiGetContainer,
  apiGetLastCollections,
  apiGetLastFiveCoordinates
} from "../api/index";


Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    state: {
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
        fireRisk: null
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
      myLocation: null,
      myLocationMarker: null,
      counterFireRisk: 0,
      queryPolygon: null,
      currentContainer: null,
      currentContainerLastCollections: null,
      currentContainerLastFiveCoordinates: null
    },

    getters: {
      getQueryParameterObject(state) {
        return state.queryParameterObject;
      },

      getSelectedFireRisk(state) {
        return state.queryParameterObject.fireRisk;
      },

      getFullnessColors(state) {
        return state.fullnessColors;
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
            if (key === "fullness") {
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
            } else if (key === "fireRisk") {
              if (value === "yes") {
                return `${key}=true`;
              } else {
                return `${key}=false`;
              }
            }
            else {
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

      getQueryPolygon(state) {
        return state.queryPolygon;
      },

      getCurrentContainer(state) {
        return state.currentContainer;
      },

      getCurrentContainerLastCollections(state) {
        return state.currentContainerLastCollections;
      },

      getCurrentContainerLastFiveCoordinates(state) {
        return state.currentContainerLastFiveCoordinates;
      }
    },

    mutations: {
      resetFullnessValues(state) {
        state.fullnessColors.countGreen = 0;
        state.fullnessColors.countGrey = 0;
        state.fullnessColors.countRed = 0;
        state.fullnessColors.countYellow = 0;
      },

      increaseFullnessColors(state, payload) {
        state.fullnessColors = payload;
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

      setQueryPolygon(state, payload) {
        state.queryPolygon = payload;
      },

      setCurrentContainer(state, payload) {
        state.currentContainer = payload;
      },

      setCurrentContainerLastCollections(state, payload) {
        state.currentContainerLastCollections = payload;
      },

      setCurrentContainerLastFiveCoordinates(state, payload) {
        state.currentContainerLastFiveCoordinates = payload;
      }
    },

    actions: {
      setPageSize({commit}, payload) {
        commit("setPageSize", payload);
      },

      setMap({commit}, payload) {
        commit("setMap", payload);
      },

      getContainers(context) {
        Loading.show({
          delay: 0,
          message: 'Konteyner verisi yükleniyor<br/>',
          spinnerColor: "blue-6"
        });

        apiGetContainers()
          .then(response => {
            console.log("Get containers cevap")
            const featuresWithGeometry = response.data.filter(container => {
              return container.latitude !== null && container.longitude !== null;
            });

            console.log(featuresWithGeometry)

            context.commit("changeFilter", true);
            context.dispatch("setContainers", featuresWithGeometry)
              .then(() => {
                context.dispatch("populateFullness");
              })
          }).catch(error => {
          console.log("Konteynerler yüklenirken hata oluştu! ", error);
        })
      },

      setContainers({commit}, payload) {
        commit("setContainers", payload);
      },

      setClickedContainer(context, payload) {
        context.commit("setClickedContainer", payload);
        context.commit("setCurrentContainer", payload.container)
        context.dispatch("setCurrentContainerLastCollections", payload.container.id);
        context.commit("expandContainerDetail", true);
      },

      changeFilter({commit}, payload) {
        commit("changeFilter", payload);
      },

      updateQueryParameter({commit}, payload) {
        commit("updateQueryParameter", payload);
      },

      updateGeometry(context, payload) {
        apiPatchContainer(payload).then(() => {
          Dialog.create({
            title: 'Uyarı',
            ok: {label: "Tamam"},
            message: `${context.getters.getClickedContainer.container.containerName} adlı konteynerin konumu güncellendi.`
          })

          context.dispatch("updatingGeometry");
          context.dispatch("getContainers");
        }).catch(error => {
          console.log("Veri güncellenirken hata oluştu", error);
        })
      },

      updatingGeometry(context) {
        context.commit("updatingGeometry");
        if (context.state.clickedContainer) {
          context.state.clickedContainer.marker.setIcon(context.getters.currentMarkerSymbol);
        }
      },

      addGeometry(context, payload) {
        console.log(payload)
        apiPatchContainer(payload).then(() => {
          Dialog.create({
            title: 'Uyarı',
            ok: {label: "Tamam"},
            message: `${payload.containerID} numaralı konteynerin konumu girildi.`
          })
        }).catch(error => {
          console.log("Geometri girilirken hata oluştu", error);
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
          if (context.getters.getSettings.page !== "container-page") {
            Notify.create({
              type: 'info',
              message: `Dolu durumda ${context.getters.getFullnessColors.countRed} adet konteyner vardır!`,
              actions: [{ icon: 'close', color: 'white' }],
              icon: "local_shipping",
              classes: "notifier-fullness"
            })
          }
        }
      },

      queryContainers(context) {
        Loading.show({
          delay: 0,
          message: 'Konteyner verisi yükleniyor<br/>',
          spinnerColor: "blue-6"
        });

        if (context.getters.getQueryParameters) {
          apiGetFilteredContainers(context.getters.getQueryParameters)
            .then(response => {
              const featuresWithGeometry = response.data.filter(container => {
                return container.latitude !== null && container.longitude !== null;
              });

              context.dispatch("setContainers", featuresWithGeometry)
                .then(() => {
                  context.dispatch("populateFullness");
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
              title: "Konumum",
              icon: {
                path:
                  "M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z",
                fillColor: "grey",
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new window.google.maps.Point(15, 30),
              },
              map: context.getters.getMap
            })

            context.getters.getMap.panTo(context.getters.getMyLocation);
            context.getters.getMap.setZoom(17);

            context.dispatch("setMyLocationMarker", markerMyLocation)
          }, error => {
            console.log("Konum bilgisi çekilirken hata oluştu", error)
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
          message: `Yangın riski olan ${context.getters.getCounterFireRisk} adet konteyner vardır!`,
          actions: [
            {
              icon: "visibility",
              color: "white",
              handler: () => {
                context.commit("updateQueryParameter", {query: "fireRisk", value: "yes"});
                context.dispatch("queryContainers");
              },
              label: "GÖRMEK İÇİN TIKLAYINIZ"
              },
            {icon: 'close', color: 'white'}
            ],
          icon: "local_fire_department",
          timeout: 3000000,
          classes: "notifier-fire-risk"
        })
      },

      setQueryPolygon({commit}, payload) {
        commit("setQueryPolygon", payload);
      },

      setCurrentContainer(context, payload) {
        apiGetContainer(payload)
          .then(response => {
            console.log("Container page: ", response.data);
            context.commit("setCurrentContainer", response.data);
            context.commit("setClickedContainer", {container: response.data});
            context.dispatch("setCurrentContainerLastCollections", response.data.id);
          }).catch(error => {
          console.log("Konteyner çekilirken hata oluştu", error);
        })
      },

      setCurrentContainerLastCollections({commit}, payload) {
        apiGetLastCollections(payload)
          .then(response => {
            console.log(response.data);
            commit("setCurrentContainerLastCollections", response.data);
          })
      },

      setCurrentContainerLastFiveCoordinates(context, payload) {
        apiGetLastFiveCoordinates(payload)
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
                  title: "Konumum",
                  icon: {
                    path:
                      "M12 6C8.62 6 5.5 7.12 3 9L1.2 6.6C4.21 4.34 7.95 3 12 3S19.79 4.34 22.8 6.6L21 9C18.5 7.12 15.38 6 12 6M13 15.09C12.69 15.03 12.35 15 12 15C10.65 15 9.4 15.45 8.4 16.2L12 21L13.8 18.6C13.33 17.58 13 16.5 13 15.5C13 15.36 13 15.23 13 15.09M12 9C9.3 9 6.81 9.89 4.8 11.4L6.6 13.8C8.1 12.67 9.97 12 12 12C12.73 12 13.43 12.09 14.1 12.25C14.86 11.25 15.93 10.5 17.17 10.18C15.6 9.43 13.85 9 12 9M22 15.5C22 18.1 18.5 22 18.5 22S15 18.1 15 15.5C15 13.6 16.6 12 18.5 12S22 13.6 22 15.5M19.7 15.6C19.7 15 19.1 14.4 18.5 14.4S17.3 14.9 17.3 15.6C17.3 16.2 17.8 16.8 18.5 16.8S19.8 16.2 19.7 15.6Z",
                    fillColor: "orange",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 2,
                    anchor: new window.google.maps.Point(15, 30),
                  },
                  label: {
                    text: String(calculation.sensorReadDate),
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "#14586a"
                  },
                  map: context.getters.getMap
                })
              }
            })
          })
      }
    }
  })
}
