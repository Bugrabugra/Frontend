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
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      const database = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    }
  },
  modules: {
  }
})
