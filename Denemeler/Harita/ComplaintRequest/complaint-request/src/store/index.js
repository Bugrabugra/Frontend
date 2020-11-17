import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginType: "",
    citizen: {},
    clerk: {}
  },
  mutations: {
    mChangeLoginType(state, payload) {
      state.loginType = payload;
    },

    mChangeCitizen(state, payload) {
      state.citizen = payload;
    },

    mChangeClerk(state, payload) {
      state.clerk = payload;
    }
  },
  actions: {
    aChangeLoginType(context, payload) {
      context.commit("mChangeLoginType", payload);
    },

    aChangeCitizen(context, payload) {
      context.commit("mChangeCitizen", payload);
    },

    aChangeClerk(context, payload) {
      context.commit("mChangeClerk", payload);
    }
  },
  modules: {
  }
})
