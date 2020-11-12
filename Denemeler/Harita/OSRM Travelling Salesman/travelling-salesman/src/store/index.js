import Vue from "vue";
import Vuex from "vuex";
// import VectorSource from "ol/source/Vector";
// import {Circle, Fill, Icon, Stroke, Style} from "ol/style";
// import Pin from "../../public/red-map-pin-with-shadow.png";


Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,
  state: {
    arrayCoordName: [],
    startSolve: false,
    solveResult: null,
    animation: {}
  },

  getters: {

  },

  mutations: {
    mAddArrayCoordName(state, payload) {
      state.arrayCoordName.push(payload);
    },

    mStartSolve(state) {
      state.startSolve = true;
    },

    mSendSolveResult(state, payload) {
      state.solveResult = payload;
    },

    mStartAnimate(state, payload) {
      state.animation = payload;
    }
  },

  actions: {
    aAddArrayCoordName(context, payload) {
      context.commit("mAddArrayCoordName", payload);
    },

    aStartSolve(context) {
      context.commit("mStartSolve");
    },

    aSendSolveResult(context, payload) {
      context.commit("mSendSolveResult", payload);
    },

    aStartAnimate(context, payload) {
      context.commit("mStartAnimate", payload);
    }
  }
});