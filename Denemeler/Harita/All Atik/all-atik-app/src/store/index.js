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
      startDrawingContainers: false
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

      startDrawingContainers(state) {
        return state.startDrawingContainers;
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

      startDrawingContainers(state, payload) {
        state.startDrawingContainers = payload;
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
            commit("startDrawingContainers", true);
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

      startDrawingContainers({commit}, payload) {
        commit("startDrawingContainers", payload);
      }
    }
  })
}
