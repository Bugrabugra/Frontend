import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginType: "",
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },

  mutations: {
    mChangeLoginType(state, payload) {
      state.loginType = payload;
    },

    mAuthRequest(state) {
      state.status = "loading";
    },

    mAuthSuccess(state, {token, user}){
      state.status = "success"
      state.token = token
      state.user = user
    },

    mAuthError(state){
      state.status = "error"
    },

    mLogout(state){
      state.status = ""
      state.token = ""
    },
  },

  actions: {
    aChangeLoginType(context, payload) {
      context.commit("mChangeLoginType", payload);
    },

    aLogin(context, user) {
      return new Promise((resolve, reject) => {
        context.commit("mAuthRequest");
        axios({
          url: `http://localhost:3000/${context.state.loginType === "citizen" ? "citizen" : "state"}`,
          data: user,
          method: "POST"
        }).then(response => {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          context.commit("mAuthSuccess", {token, user});
          resolve(response);
        }).catch(error => {
          context.commit("mAuthError");
          localStorage.removeItem("token");
          reject(error);
        })
      })
    },

    aLogout(context) {
      return new Promise((resolve) => {
        context.commit("mLogout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      }).then(() => {
        router.push("/");
      })
    },
  },

  getters: {
    gUser(state) {
      return state.user.adsoyad;
    }
  }
})
