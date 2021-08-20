import { createStore } from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";


export default createStore({
  state: {
    sampleBlogCards: [
      {blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2021"},
      {blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2021"},
      {blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2021"},
      {blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2021"},
    ],
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.charAt(0) +
        state.profileLastName.charAt(0)
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}, user) {
      const database = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      console.log(token, admin)
      commit("setProfileAdmin", admin);
    },
    async updateUserSettings({commit, state}) {
      const database = await db
        .collection("users")
        .doc(state.profileId);
      await database.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername
      });
      commit("setProfileInitials");

    }
  },
  modules: {
  }
})
