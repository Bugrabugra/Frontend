import Vue from 'vue'
import Vuex from 'vuex'
import axios from "./axios-auth";
import globalAxios from "axios";
import router from "./router";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },

    storeUser(state, user) {
      state.user = user;
    },

    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    setLogoutTimer(context, expirationTime) {
      setTimeout(() => {
        context.commit("clearAuthData");
      }, expirationTime * 1000)
    },

    signUp(context, authData) {
      axios.post(
        '/accounts:signUp?key=AIzaSyB92phVanhg-LHYDJaZASDaN1iAKYOBSCY',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          context.commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          context.dispatch("storeUser", authData);
          context.dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => console.log(error))
    },

    login(context, authData) {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyB92phVanhg-LHYDJaZASDaN1iAKYOBSCY',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          context.commit("authUser", {
              token: res.data.idToken,
              userId: res.data.localId
            })
          context.dispatch("setLogoutTimer", res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },

    tryAutoLogin(context) {
      const token = localStorage.getItem("token");
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem("userId");
      context.commit("authUser", {
        token: token,
        userId: userId
      });
    },

    logout(context) {
      context.commit("clearAuthData");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      router.replace("/signin");
    },

    storeUser(context, userData) {
      if (!context.state.idToken) {
        return
      }
      globalAxios.post("/users.json" + "?auth=" + context.state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },

    fetchUser(context) {
      if (!context.state.idToken) {
        return
      }
      globalAxios.get("/users.json" + "?auth=" + context.state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users);
          context.commit("storeUser", users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
})