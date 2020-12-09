<template>
  <h1>Realtime data</h1>
  <div v-for="post in posts" :key="post.id">
    <div>
      {{post.title}}
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";
  import {projectFirestore} from "../firebase/config";


  export default {
    name: "RealTime",
    setup() {
      const posts = ref([]);
      projectFirestore.collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((snap) => {
          posts.value = snap.docs.map(doc => {
            return {...doc.data(), id: doc.id}
          });
        })

      return {posts}
    }
  }
</script>

<style scoped>

</style>