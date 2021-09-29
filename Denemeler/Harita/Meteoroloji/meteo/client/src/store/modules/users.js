import axios from "axios";
import router from "../../router";

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
      // await router.replace("/login");
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
      // await router.replace("/login");
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
      // await router.replace("/login");
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