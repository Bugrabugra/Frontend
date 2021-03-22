import Vue from 'vue';
import Vuex from 'vuex';
import {api} from "boot/axios";
import {Dialog, Loading} from 'quasar'


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
      routeCreated: false
    },

    getters: {
      getMap(state) {
        return state.map;
      },

      getContainers(state) {
        return state.containers;
      },

      getContainer(state) {
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
      }
    },

    mutations: {
      setMap(state, payload) {
        state.map = payload;
      },

      setContainers(state, payload) {
        state.containers = payload;
      },

      getContainer(state, payload) {
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

        api.get(`/containers`)
          .then(response => {
            // commit("setContainers", []);
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

      getContainer({commit}, payload) {
        commit("getContainer", payload);
        commit("expandContainerDetail", true);
      },

      changeFilter({commit}, payload) {
        commit("changeFilter", payload);
      },

      updateQueryParameter({commit}, payload) {
        commit("updateQueryParameter", payload);
      },

      updateGeometry(context, payload) {
        api.patch(
          `/containers/${payload.containerID}`,
          {
            latitude: payload.latitude,
            longitude: payload.longitude
          }
        ).then((response) => {
          Dialog.create({
            title: 'Uyarı',
            ok: {label: "Tamam"},
            message: `${context.getters.getContainer.container.containerName} adlı konteynerin konumu güncellendi.`
          })

          context.dispatch("updatingGeometry");
        }).catch(error => {
          console.log("Veri güncellenirken hata oluştu", error);
        })
      },

      updatingGeometry(context) {
        context.commit("updatingGeometry");
        context.state.clickedContainer.marker.setIcon(context.getters.currentMarkerSymbol);
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
      }
    }
  })
}
