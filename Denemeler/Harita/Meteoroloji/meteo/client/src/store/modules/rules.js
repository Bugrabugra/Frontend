import axios from "axios";
import router from "../../router";

// state *********************************
const state = () => ({
  rules: [],
  ruleSelected: null
});

// getters *******************************
const getters = {

};

// mutations *****************************
const mutations = {
  setRules(state, rules) {
    state.rules = rules;
  },
  setSelectedRule(state, rule) {
    state.ruleSelected = rule;
  }
};

// actions *******************************
const actions = {
  async getRules({commit}) {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/rules/getall",
        {
          withCredentials: true,
        }
      );
      const rules = response.data;
      commit("setRules", rules);
    } catch (error) {
      console.log(error);
      // await router.replace("/login");
    }
  },
  async createRule(_, rule) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/rules/create",
        rule,
        {
          withCredentials: true
        }
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.log(error);
      // await router.replace("/login");
    }
  },
  async editRule(_, payload) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/rules/edit/${payload.id}`,
        payload.rule,
        {
          withCredentials: true
        }
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.log(error);
      // await router.replace("/login");
    }
  },
  async deleteRule(_, ruleId) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/rules/delete/${ruleId}`,
        null,
        {
          withCredentials: true
        }
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.log(error);
      // await router.replace("/login");
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