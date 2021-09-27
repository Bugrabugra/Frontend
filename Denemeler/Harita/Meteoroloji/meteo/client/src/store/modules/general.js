// state *********************************
const state = () => ({
  isModalOpen: null,
  modalContent: ""
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