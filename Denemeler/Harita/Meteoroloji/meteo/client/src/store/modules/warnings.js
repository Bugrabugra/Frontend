import axios from "axios";


// state *********************************
const state = () => ({
  warnings: [],
  selectedWarning: null,
  selectedRulesList: null,
  isSelectRulesModalOpen: false
});

// getters *******************************
const getters = {

};

// mutations *****************************
const mutations = {
  setWarnings(state, warnings) {
    state.warnings = warnings;
  },
  setSelectedWarning(state, warning) {
    state.selectedWarning = warning;
  },
  setSelectedRulesList(state, selectedRulesList) {
    state.selectedRulesList = selectedRulesList;
  },
  setSelectRulesModalOpen(state, bool) {
    state.isSelectRulesModalOpen = bool;
  }
};

// actions *******************************
const actions = {
  async getWarnings({commit}) {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/warnings/getall",
        {
          withCredentials: true,
        }
      );
      const warnings = response.data;
      commit("setWarnings", warnings);
      console.log(warnings);
    } catch (error) {
      console.log(error);
    }
  },
  async createWarning(_, warning) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/warnings/create",
        warning,
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
  async editWarning(_, payload) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/warnings/edit/${payload.id}`,
        payload.warning,
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
  async deleteWarning(_, warningId) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/warnings/delete/${warningId}`,
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