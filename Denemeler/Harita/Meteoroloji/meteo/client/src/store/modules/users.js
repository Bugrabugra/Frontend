import axios from "axios";


// state *********************************
const state = () => ({
  users: [],
  selectedUser: null,
  selectedPOIsList: null,
  isSelectPOIListModalOpen: false,
  selectedWarningsList: null,
  isSelectWarningListModalOpen: false
});

// getters *******************************
const getters = {

};

// mutations *****************************
const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setSelectedUser(state, user) {
    state.selectedUser = user;
  },
  setSelectedPOIsList(state, selectedPOIsList) {
    state.selectedPOIsList = selectedPOIsList;
  },
  setSelectPOIsModalOpen(state, bool) {
    state.isSelectPOIListModalOpen = bool;
  },
  setSelectedWarningsList(state, selectedWarningsList) {
    state.selectedWarningsList = selectedWarningsList;
  },
  setSelectWarningsModalOpen(state, bool) {
    state.isSelectWarningListModalOpen = bool;
  }
};

// actions *******************************
const actions = {
  async getUsers({commit}) {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/getall",
        {
          withCredentials: true
        }
      );
      const users = response.data;
      commit("setUsers", users);
    } catch (error) {
      console.log(error);
    }
  },
  async createUser(_, user) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/create",
        user,
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
  async editUser(_, payload) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/edit/${payload.id}`,
        payload.user,
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
  async deleteUser(_, userId) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/delete/${userId}`,
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