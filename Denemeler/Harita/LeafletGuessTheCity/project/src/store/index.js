import Vue from 'vue'
import Vuex from 'vuex'
import cities from "../../data/il";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ruleDialog: false,
    correctCity: "",
    guessedCity: "",
    result: "",
    score: 0,
    cities: cities,
    gameStarted: false,
    outOfTime: false
  },

  mutations: {
    showRuleDialog(state, payload) {
      state.ruleDialog = payload;
    },

    correctCity(state) {
      const randomNumber = Math.floor(Math.random() * 82);
      state.correctCity = state.cities.features[randomNumber]["properties"]["NAME"];
    },

    guessedCity(state, payload) {
      state.guessedCity = payload;
    },

    result(state, payload) {
      state.result = payload;
    },

    addScore(state) {
      state.score += 1;
    },

    deleteScore(state) {
      state.score = 0;
    },

    gameStarted(state, payload) {
      state.gameStarted = payload;
    },

    outOfTime(state, payload) {
      state.outOfTime = payload;
    }
  },

  actions: {
    showRuleDialog({commit}, payload) {
      commit("showRuleDialog", payload);
    },

    correctCity({commit}) {
      commit("correctCity");
    },

    guessedCity({commit}, payload) {
      commit("guessedCity", payload)
    },

    result({commit}, payload) {
      commit("result", payload);
    },

    addScore({commit}) {
      commit("addScore");
    },

    deleteScore({commit}) {
      commit("deleteScore");
    },

    gameStarted({commit}, payload) {
      commit("gameStarted", payload);
    },

    outOfTime({commit}, payload) {
      commit("outOfTime", payload);
    }
  },

  getters: {
    ruleDialog(state) {
      return state.ruleDialog;
    },

    correctCity(state) {
      return state.correctCity;
    },

    guessedCity(state) {
      return state.guessedCity;
    },

    result(state) {
      return state.result;
    },

    score(state) {
      return state.score;
    },

    gameStarted(state) {
      return state.gameStarted;
    },

    outOfTime(state) {
      return state.outOfTime;
    }
  }
})
