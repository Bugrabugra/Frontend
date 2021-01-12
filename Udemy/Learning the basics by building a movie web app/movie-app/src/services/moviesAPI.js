import firebase from "./firebase";


const db = firebase.firestore().collection("movies");

const moviesAPI = {
  async getMovies() {
    const documents = await db.get();
    return  documents.docs.map( doc => {
      return {...doc.data(), id: doc.id}
    })
  },

  async addMovie(form) {
    const {id} = await db.add(form);
    return {...form, id};
  },

  async getMovieById(id) {
    const document = await db.doc(id).get();
    return {...document.data(), id};
  },

  async updateMovie(form) {
    return await db.doc(form.id).update(form);
  },

  async deleteMovie(id) {
    return await db.doc(id).delete();
  }
}

export default moviesAPI;