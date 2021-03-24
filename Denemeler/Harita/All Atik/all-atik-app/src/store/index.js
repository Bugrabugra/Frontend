import Vue from 'vue';
import Vuex from 'vuex';
import {Dialog, Loading} from 'quasar'
import {apiGetContainers, apiPatchContainer} from "../api/index";


Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    state: {
      settings: {},
      map: null,
      resetView: false,
      containers: [],
      clickedContainer: null,
      filterChanged: false,
      queryParameterArray: [],
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
    },

    getters: {
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
        return Object.keys(state.queryParameterObject).map(key => {
          if (key === "fullness" && state.queryParameterObject.fullness === null) {

          }
          if (state.queryParameterObject[key]) {
            if (key === "fullness") {
              const [min, max] = String(state.queryParameterObject[key]).split("-");
              if (max === "100") {
                return `${key}_gte=${min}&${key}_lte=${max}`;
              } else {
                return `${key}_gte=${min}&${key}_lte=${max}&${key}_ne=${max}`;
              }
            } else {
              return `${key}=${state.queryParameterObject[key]}`;
            }
          }
        }).join("&");
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
      }
    },

    mutations: {
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
      }
    },

    actions: {
      setMap({commit}, payload) {
        commit("setMap", payload);
      },

      getContainers({commit}) {
        Loading.show({
          delay: 0,
          message: 'Konteyner verisi yükleniyor<br/>',
          spinnerColor: "blue-6"
        });

        apiGetContainers()
          .then(response => {
            const featuresWithGeometry = response.data.filter(container => {
              return container.latitude !== null && container.longitude !== null;
            });

            commit("changeFilter", true);
            commit("setContainers", featuresWithGeometry);
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
        apiPatchContainer().then((response) => {
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
      }
    }
  })
}
