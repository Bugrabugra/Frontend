import Vue from 'vue';
import Vuex from 'vuex';
import {Dialog, Loading, Notify} from 'quasar'
import {apiGetContainers, apiGetFilteredContainers, apiPatchContainer} from "../api/index";


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
      }
    },

    getters: {
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
            } else {
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

      getClickedContainer(state, payload) {
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

      getClickedContainer({commit}, payload) {
        commit("getClickedContainer", payload);
        commit("expandContainerDetail", true);
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
        apiPatchContainer().then(() => {
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
          Notify.create({
            type: 'negative',
            message: `Dolu durumda ${context.getters.getFullnessColors.countRed} adet konteyner vardır!`,
            actions: [{ icon: 'close', color: 'white' }],
            icon: "local_shipping"
          })
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
          // TODO
          context.dispatch("queryContainers");
        }
      }
    }
  })
}
