import axios from "axios";
import router from "../../router";

// state *********************************
const state = () => ({
  POIs: []
});

// getters *******************************
const getters = {

};

// mutations *****************************
const mutations = {
  setPOIs(state, POIs) {
    state.POIs = POIs;
  }
};

// actions *******************************
const actions = {
  async getPOIs({commit}) {
    const response = await axios.get(
      "http://localhost:3001/api/map/getpois",
      {
        withCredentials: true,
      }
    );
    const result = await response.data;
    if (result) {
      commit("setPOIs", result);
      return result;
    } else {

    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}