<template>
  <div class="image-uploader">
    <ImageUploader :api="api" @imageUploaded="newImage"/>
    <ImageGallery v-if="images.length > 0" server="http://localhost:3001" :images="images" @removeImage="removeImage"/>
  </div>
</template>

<script setup>
  import {onBeforeMount, onMounted, ref, watch} from "vue";
  import ImageUploader from "./components/ImageUploader.vue";
  import ImageGallery from "./components/ImageGallery.vue";


  const api = {
    upload: "http://localhost:3001/upload",
    retrieve: "http://localhost:3001/retrieve",
    remove: "http://localhost:3001/remove",
  }

  const images = ref([]);

  const newImage = (image) => {
    images.value.push(image);
  };

  const removeImage = (image) => {
    let index = images.value.indexOf(image);
    images.value.splice(index, 1);

    fetch(api.remove, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image)
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
    })
  };

  onMounted(() => {
    fetch(api.retrieve)
      .then(response => {
        return response.json();
      }).then(images => {
        images.value = images;
        console.log(images)
      }).catch(error => {
      console.log(error)
    })
  });
</script>

<style>
  body {
    font-family: "Avenir LT Std", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
  }

  .image-uploader {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>