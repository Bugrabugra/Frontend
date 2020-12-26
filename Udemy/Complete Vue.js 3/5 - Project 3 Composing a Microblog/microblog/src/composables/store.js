import {computed, reactive} from "vue";


class Store {
  constructor() {
    this.state = reactive({
      posts: [
        {
          id: 1,
          title: "Learning Vue.js 3",
          content: "Using the composition API",
          likes: 10,
          hashtags: [
            "vue",
            "javascript",
            "composition api"
          ]
        },
        {
          id: 2,
          title: "Learning Vuex",
          content: "Vuex is goooooood",
          likes: 7,
          hashtags: [
            "vue",
            "javascript",
            "vuex"
          ]
        },
        {
          id: 3,
          title: "Learning VueRouter",
          content: "Router is goooooood",
          likes: 5,
          hashtags: [
            "vue",
            "vue-router",
          ]
        },
      ],
      currentHashtag: null
    })
  }

  get filteredPosts() {
    return computed(() => {
      if (!this.state.currentHashtag) {
        return this.state.posts
      }
      return this.state.posts.filter(post => {
        return post.hashtags.includes(this.state.currentHashtag);
      });
    });
  }

  setHashtag(tag) {
    this.state.currentHashtag = tag
  }

  incrementLike(post) {
    const thePost = this.state.posts.find(x => {
      return x.id === post.id;
    })
    if (!thePost) {
      return
    }

    thePost.likes += 1;
  }
}

export const store = new Store();