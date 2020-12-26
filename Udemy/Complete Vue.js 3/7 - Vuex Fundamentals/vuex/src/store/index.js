import { createStore } from 'vuex';
import {testPosts} from "../../../../6 - Vue Router Fundamentals/router/src/data/testPosts";


const delay = () => new Promise(res => setTimeout(res, 1000));

const posts = {
  namespaced: true,

  state() {
    return {
      currentPost: null
    }
  },
  mutations: {
    setPost(state, post) {
      state.currentPost = post;
    }
  },
  actions: {
    async fetchDataFromServer(context, id) {
      await delay();
      const post = testPosts.find(post => {
        return post.id === id;
      })
      console.log(post);
      context.commit("setPost", post);
    }
  },
  modules: {
  }
}

export default createStore({
  modules: {
    posts
  }
})
