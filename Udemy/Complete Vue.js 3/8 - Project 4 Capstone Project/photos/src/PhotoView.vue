<template>
  <img v-for="photo in currentAlbumPhotos" :src="photo.url"/>
</template>

<script>
  export default {
    name: "PhotoView",

    computed: {
      currentAlbumPhotos() {
        return this.$store.state.photos.currentAlbumPhotos
      }
    }
  }
</script>

<style scoped>

</style>