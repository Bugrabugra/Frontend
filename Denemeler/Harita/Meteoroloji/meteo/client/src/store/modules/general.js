// state *********************************
const state = () => ({
  isModalOpen: null,
  modalContent: "",
  ruleList: []
});

// getters *******************************
const getters = {

};

// mutations *****************************
const mutations = {
  setModal(state, bool) {
    state.isModalOpen = bool;
  },
  setModalContent(state, content) {
    state.modalContent = content;
  },
  setRuleList(state, ruleList) {
    state.ruleList = ruleList;
  }
};

// actions *******************************
const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}