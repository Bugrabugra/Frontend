import axios from "axios";
import router from "../../router";

// state *********************************
const state = () => ({
  userLoggedIn: JSON.parse(localStorage.getItem("meteor-user")) || null,
});

// getters *******************************
const getters = {
  getUser(state) {
    return state.userLoggedIn;
    // return JSON.parse(localStorage.getItem("meteor-user")) || null;
  }
};

// mutations *****************************
const mutations = {
  setUserLoggedIn(state, user) {
    state.userLoggedIn = user;
  }
};

// actions *******************************
const actions = {
  async loginUser({commit}, credentials) {
    const response = await axios.post(
      "http://localhost:3001/api/auth/login",
      credentials,
      {
        withCredentials: true,
      }
    );
    const result = await response.data;
    console.log("RESULT: ", result);
    if (!result.errorUsername && !result.errorPassword) {
      commit("setUserLoggedIn", result);
      localStorage.setItem("meteor-user", JSON.stringify(result));
      return result;
    } else {
      console.log("ERROR");
      commit("setUserLoggedIn", null);
      localStorage.removeItem("meteor-user");
      return result;
    }
  },
  async logoutUser({commit}) {
    const response = await axios.post(
      "http://localhost:3001/api/auth/logout",
      null,
      {
        withCredentials: true
      }
    );
    if (response.status === 200) {
      commit("setUserLoggedIn", null);
      localStorage.removeItem("meteor-user");
      await router.replace("/login");
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