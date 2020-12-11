<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists"/>
    </div>
    <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
  import getCollection from "../../composables/getCollection";
  import getUser from "../../composables/getUser";
  import ListView from "../../components/ListView";


  export default {
    name: "UserPlaylists",
    components: {ListView},
    setup() {
      const {user} = getUser();
      const {documents: playlists} = getCollection(
        "playlists",
        ["userId", "==", user.value.uid]
      );

      return {playlists}
    }
  }
</script>

<style scoped>

</style>