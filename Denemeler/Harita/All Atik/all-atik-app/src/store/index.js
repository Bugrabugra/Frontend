import Vue from 'vue';
import Vuex from 'vuex';
import {api} from "boot/axios";
import {Dialog, Loading} from 'quasar'


Vue.use(Vuex)

export default function () {
  return new Vuex.Store({
    state: {
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
              const [min, max] = String(state.queryParameterObject[key]).split("-")
              return `${key}_gte=${min}&${key}_lte=${max}&${key}_ne=${max}`;
            } else {
              return `${key}=${state.queryParameterObject[key]}`;
            }
          }
        }).join("&");
      },

      updatingGeometry(state) {
        return state.updatingGeometry;
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
      }
    },

    actions: {
      getContainers({commit}) {
        Loading.show({
          delay: 0,
          message: 'Konteyner verisi yükleniyor<br/>'
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
          console.log("Güncelleme başarılı");

          Dialog.create({
            title: 'Uyarı',
            ok: {label: "Tamam"},
            message: `${context.getters.getContainer.container.containerName} adlı konteynerin konumu başarılı şekilde değiştirildi.`
          })
          //   .onOk(() => {
          //
          // })
          context.dispatch("updatingGeometry", false);
        }).catch(error => {
          console.log("Veri güncellenirken hata oluştu", error);
        })
      },

      updatingGeometry({commit}, payload) {
        commit("updatingGeometry", payload);
      }
    }
  })
}
