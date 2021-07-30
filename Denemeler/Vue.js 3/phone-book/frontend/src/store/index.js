import { createStore } from 'vuex';
import axios from "axios";


export default createStore({
  state: {
    entries: [],
    clear: false
  },
  getters: {
    getEntries(state) {
      return state.entries;
    },
    getClear(state) {
      return state.clear;
    }
  },
  mutations: {
    setEntries(state, entries) {
      state.entries = entries;
    },
    clearForm(state) {
      state.clear = !state.clear;
    }
  },
  actions: {
    async setEntries({commit}) {
      const response = await axios.get("http://localhost:3001/entries/all");
      const entries = await response.data;
      commit("setEntries", entries);
    },

    async createEntry({dispatch}, entry) {
      const response = await axios.post("http://localhost:3001/entries/create", entry);
      if (response.status === 200) {
        dispatch("setEntries");
      }

    },

    async updateEntry({dispatch}, {id: id, entry: entry}) {
      const response = await axios.patch(`http://localhost:3001/entries/update/${id}`, entry);
      if (response.status === 200) {
        dispatch("setEntries");
      }
    },

    async deleteEntry({dispatch, commit}, id) {
      const response = await axios.delete(`http://localhost:3001/entries/delete/${id}`);
      if (response.status === 200) {
        dispatch("setEntries");
        commit("clearForm");
      }
    }
  }
});