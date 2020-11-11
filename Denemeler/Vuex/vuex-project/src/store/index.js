import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    mAdd(state, payload) {
      state.count = state.count + payload;
    },

    mMinus(state, payload) {
      state.count = state.count - payload;
    }
  },
  actions: {
    aAdd(context, payload) {
      context.commit("mAdd", payload);
    },

    aMinus(context, payload) {
      context.commit("mMinus", payload);
    }
  },
  modules: {

  }
})
