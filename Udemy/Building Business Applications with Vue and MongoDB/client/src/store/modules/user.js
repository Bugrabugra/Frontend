import Vue from "vue";
import bcrypt from "bcryptjs";


const state = {
  email: "",
  userId: null,
  first: "",
  last: "",
  isLoggedIn: false,
  loginError: ""
}

const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },

  userId(state) {
    return state.userId;
  },

  loginError(state) {
    return state.loginError;
  }
}

const mutations = {
  logInUser(state, payload) {
    state.email = payload.email;
    state.first = payload.first;
    state.last = payload.last;
    state.userId = payload.userId;
    state.isLoggedIn = true;
  },

  logInError(state) {
    state.isLoggedIn = false;
    state.loginError = "Email and/or password are invalid. Login failed!"
  }
}

const actions = {
  async logInUser({commit}, payload) {
    await Vue.axios.get("/user/email/" + payload.email)
      .then(response => {
        let data = response.data;
        if (data && data.length > 0) {
          const passwordHash = data[0].password;
          if (bcrypt.compareSync(payload.password, passwordHash)) {
            const user = data[0];
            payload.userId = data[0]._id;
            payload.first = user.first;
            payload.last = user.last;
            payload.email = user.email;
            commit("logInUser", payload);
          } else {
            commit("logInError");
          }
        }
      }).catch(() => {
        commit("logInError");
      })
  },

  updateUserProfile({commit}, payload) {
    bcrypt.hash(payload.password, 8, (error, hash) => {
      if (!error) {
        payload.password = hash;
        console.log(hash);
        Vue.axios.put("/user/" + this.state.user.userId, payload)
          .then(response => {
            console.log(response);
          }).catch(error => {
          console.log(error);
        })
      } else {
        console.log(error);
      }
    })

  }
}

export default {state, mutations, actions, getters};