<template>
  <div class="gallery">
    <div class="image" v-for="(image) in images" :key="image._id">
      <img :src="server + '/images/' + image.filename" alt="">
      <button class="remove" @click="emit('removeImage', image)">
        x
      </button>
    </div>
  </div>
</template>

<script setup>
  import {watch} from "vue";


  const props = defineProps({
    server: {
      type: String
    },
    images: {
      type: Array
    }
  });
  const emit = defineEmits(["removeImage"]);
</script>

<style scoped>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
  }

  .image {
    max-width: 50%;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
  }

  img {
    width: 100%;
    display: block;
    filter: grayscale();
  }

  img:hover {
    filter: none;
  }

  .remove {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 28px;
    font-weight: 700;
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
    color: #ff2400;
    margin: 0;
    padding: 0;
  }

</style>