export const photos = {
  namespaced: true,

  state() {
    return {
      currentAlbumPhotos: [],
      loading: false,
      photoCache: {}
    }
  },

  mutations: {
    setPhotos(state, {photos, albumId}) {
      state.currentAlbumPhotos = photos;
      state.photoCache[albumId] = photos;
    },

    setLoading(state, payload) {
      state.loading = payload;
    }
  },

  actions: {
    async fetchPhotosForAlbum(context, {id}) {
      if (context.state.photoCache[id]) {
        context.commit("setPhotos", {photos: context.state.photoCache[id], albumId: id});
        return
      }
      context.commit("setLoading", true);

      const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
      const data = await res.json();
      context.commit("setPhotos", {photos: data, albumId: id});

      context.commit("setLoading", false);

    }
  }
}