import {LocalStorage} from "quasar";


const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false
  }
}

const mutations = {
  set12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value;
  },

  setTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value;
  },

  setSettings(state, settings) {
    Object.assign(state.settings, settings);
  }

}

const actions = {
  set12HourTimeFormat({commit, dispatch}, value) {
    commit("set12HourTimeFormat", value);
    dispatch("saveSettings");
  },

  setTasksInOneList({commit, dispatch}, value) {
    commit("setTasksInOneList", value);
    dispatch("saveSettings");
  },

  saveSettings({state}) {
    LocalStorage.set("settings", state.settings);
  },

  getSettings({commit}) {
    let settings = LocalStorage.getItem("settings");
    if (settings) {
      commit("setSettings", settings);
    }
  }
}

const getters = {
  settings(state) {
    return state.settings;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
