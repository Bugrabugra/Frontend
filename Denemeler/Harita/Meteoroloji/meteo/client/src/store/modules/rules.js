import axios from "axios";


// state *********************************
const state = () => ({
  rules: [],
  selectedRule: null,
  ruleTypes: [
    {value: "precipitation", name: "Yağmur"},
    {value: "snow", name: "Kar"},
    {value: "lightning", name: "Yıldırım/Şimşek"},
    {value: "green storm polygon", name: "Yeşil Fırtına Poligonu"},
    {value: "orange storm polygon", name: "Turuncu Fırtına Poligonu"},
    {value: "purple storm polygon", name: "Mor Fırtına Poligonu"},
    {value: "heat", name: "Sıcaklık"},
    {value: "wind", name: "Rüzgar"},
  ]
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
    state.selectedRule = rule;
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
      console.log(rules);
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