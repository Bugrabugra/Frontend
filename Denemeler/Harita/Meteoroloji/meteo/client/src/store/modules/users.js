import axios from "axios";

// state *********************************
const state = () => ({
  users: [],
  userSelected: null
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
    state.userSelected = user;
  }
};

// actions *******************************
const actions = {
  async getUsers({commit}) {
    const response = await axios.get("http://localhost:3001/api/users/getall");
    const users = response.data;
    commit("setUsers", users);
  },
  async createUser(_, user) {
    const response = await axios.post(
      "http://localhost:3001/api/users/create",
      user,
    );
    const result = response.data;
    return result;
  },
  async editUser(_, payload) {
    const response = await axios.post(
      `http://localhost:3001/api/users/edit/${payload.id}`,
      payload.user
    );
    const result = response.data;
    return result;
  },
  async deleteUser(_, userId) {
    const response = await axios.post(
      `http://localhost:3001/api/users/delete/${userId}`,
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