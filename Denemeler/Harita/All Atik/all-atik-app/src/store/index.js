import Vue from 'vue';
import Vuex from 'vuex';
import {api} from "boot/axios";
import {Dialog, Loading} from 'quasar'


Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    state: {
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
      expandContainerDetail: false
    },

    getters: {
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
      }
    },

    mutations: {
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

      updatingGeometry(state, payload) {
        state.updatingGeometry = payload;
      },

      expandContainerDetail(state, payload) {
        state.expandContainerDetail = payload;
      },

      resetView(state, payload) {
        state.resetView = payload;
      }
    },

    actions: {
      getContainers({commit}) {
        Loading.show({
          delay: 0,
          message: 'Konteyner verisi yükleniyor<br/>',
          spinnerColor: "blue-6"
        });

        api.get(`/containers`)
          .then(response => {
            commit("setContainers", []);
            commit("setContainers", response.data);
            commit("changeFilter", true);
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
          `/containers/${context.getters.getContainer.container.id}`,
          {
            latitude: payload.latitude,
            longitude: payload.longitude
          }
        ).then((response) => {

          Dialog.create({
            title: 'Uyarı',
            ok: {label: "Tamam"},
            message: `${context.getters.getContainer.container.containerName} adlı konteynerin konumu değiştirildi.`
          })

          context.dispatch("updatingGeometry", false);
        }).catch(error => {
          console.log("Veri güncellenirken hata oluştu", error);
        })
      },

      updatingGeometry({commit}, payload) {
        commit("updatingGeometry", payload);
      },

      expandContainerDetail({commit}, payload) {
        commit("expandContainerDetail", payload);
      },

      resetView({commit}, payload) {
        commit("resetView", payload);
      }
    }
  })
}
