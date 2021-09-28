import axios from "axios";

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
    const response = await axios.get("http://localhost:3001/api/rules/getall");
    const rules = response.data;
    commit("setRules", rules);
  },
  async createRule(_, rule) {
    const response = await axios.post(
      "http://localhost:3001/api/rules/create",
      rule,
    );
    const result = response.data;
    return result;
  },
  async editRule(_, payload) {
    const response = await axios.post(
      `http://localhost:3001/api/rules/edit/${payload.id}`,
      payload.rule
    );
    const result = response.data;
    return result;
  },
  async deleteRule(_, ruleId) {
    const response = await axios.post(
      `http://localhost:3001/api/rules/delete/${ruleId}`,
    );
    const result = response.data;
    return result;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}