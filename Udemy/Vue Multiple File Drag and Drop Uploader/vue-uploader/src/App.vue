<template>
  <div id="app" class="container">
    <Uploader
        :options="{baseURL: 'http://localhost:8000/api', maxConcurrentUploads: 1}"
        :handlers="{'video/mp4': {endpoint: 'uploads/video'}}"
    />
  </div>
</template>

<script>
  import Uploader from "./uploader/components/Uploader";

  export default {
    name: 'App',

    components: {
      Uploader
    }
  }
</script>

<style src="@/assets/styles/app.css">

</style>