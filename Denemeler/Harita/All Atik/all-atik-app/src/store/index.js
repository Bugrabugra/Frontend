import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

export default function () {
  return new Vuex.Store({
    state: {
      containers: [],
      clickedContainer: null
    },

    getters: {
      getContainers(state) {
        return state.containers;
      },

      getContainer(state) {
        return state.clickedContainer
      }
    },

    mutations: {
      setContainers(state, payload) {
        state.containers = payload;
      },

      getContainer(state, payload) {
        state.clickedContainer = payload;
      }
    },

    actions: {
      setContainers({commit}, payload) {
        commit("setContainers", payload);
      },

      getContainer({commit}, payload) {
        commit("getContainer", payload);
      }
    }
  })
}
