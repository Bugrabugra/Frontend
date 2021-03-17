import Vue from 'vue';
import Vuex from 'vuex';
import {api} from "boot/axios";


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
        regionID: 0,
        containerType: "",
        fullness: ""
      }
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
          if (state.queryParameterObject[key]) {
            return `${key}=${state.queryParameterObject[key]}`
          }
        }).join("&");
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
      }
    },

    actions: {
      getContainers({commit}) {
        // this.$q.loading.show({
        //   delay: 0,
        //   message: 'Konteyner verisi yükleniyor<br/>'
        // });

        api.get(`/containers`)
          .then(response => {
            commit("setContainers", []);
            commit("setContainers", response.data);
            commit("changeFilter", true);
          }).catch(error => {
          console.log("Error on getting containers! ", error);
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
      }
    }
  })
}
