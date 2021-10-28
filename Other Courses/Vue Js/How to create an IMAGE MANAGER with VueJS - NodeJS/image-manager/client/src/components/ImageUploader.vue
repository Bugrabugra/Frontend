<template>
  <div class="container">
    <label for="title">Image Title:</label><br>
    <input type="text" name="title" id="title">
    <br>
    <label for="image">Upload Image:</label>
    <input type="file" name="image" id="image" accept="image/*">
    <br>
    <button @click="uploadForm">Upload</button>
  </div>
</template>

<script setup>
  const props = defineProps(["api"]);
  const emit = defineEmits(["imageUploaded"])

  const uploadForm = () => {
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").files[0];

    let payload = new FormData();
    payload.append("title", title);
    payload.append("image", image);

    fetch(props.api.upload, {
      method: "POST",
      body: payload
    }).then(response => {
      return response.json();
    }).then(data => {
      emit("imageUploaded", data);
    })
  };
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 100%;
  }
</style>