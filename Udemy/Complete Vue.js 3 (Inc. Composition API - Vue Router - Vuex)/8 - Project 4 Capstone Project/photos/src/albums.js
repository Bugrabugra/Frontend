export const albums = {
  namespaced: true,
  state() {
    return {
      all: []
    }
  },

  mutations: {
    setAlbums(state, payload) {
      state.all = payload;
    }
  },

  actions: {
    async fetchAlbums(context) {
      const res = await fetch("https://jsonplaceholder.typicode.com/albums");
      const data = await res.json();
      context.commit("setAlbums", data);
    }
  }
}