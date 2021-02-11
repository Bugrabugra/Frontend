import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    situations: []
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },

    setSituations(state, payload) {
      state.situations = payload;
    }
  },

  actions: {
    setProducts({commit}, payload) {
      commit("setProducts", payload);
    },

    setSituations(state, payload) {
      state.setSituations = payload;
    }
  },

})
