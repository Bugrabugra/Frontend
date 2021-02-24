<template>
  <Layout>
    <template v-slot:header>
      Header
    </template>

    <template v-slot:sidebar>
      <Album v-for="album in albums" :album="album">
        {{album.title}}
      </Album>
    </template>

    <template v-slot:content>
      <router-view/>
    </template>
  </Layout>
</template>

<script>
  import Layout from "./Layout";
  import Album from "./Album";


  export default {
    name: 'PhotoApp',

    components: {
      Album,
      Layout
    },

    async created() {
      this.$store.dispatch("albums/fetchAlbums");
    },

    methods: {
      fetchPhotosForAlbum(albumId) {
        this.$store.dispatch("photos/fetchPhotosForAlbum", {id: albumId});
      }
    },

    watch: {
      $route: {
        handler(val) {
          this.fetchPhotosForAlbum(val.params.id);
        },
        immediate: true
      },
    },

    computed: {
      albums() {
        return this.$store.state.albums.all
      },
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
</style>
