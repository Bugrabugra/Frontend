<template>
  <div class="app">
    <header>
      <h1>Take a screenshot</h1>
    </header>

    <main>
      <form @submit.prevent="requestScreenshot">
        <input type="url" name="url" id="url" v-model="url">
        <input type="submit" value="Take screenshot">
      </form>

      <a
          v-if="screenshotURL !== ''"
          :href="screenshotURL"
          target="_blank"
          download
      >
        <img :src="screenshotURL">
      </a>
    </main>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: 'App',
    setup() {
      const url = ref("http://");
      const screenshotURL = ref("");

      const requestScreenshot = async () => {
        const response = await fetch("http://localhost:5000/screenshot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: url.value
          })
        });
        const data = await response.json();

        screenshotURL.value = `http://localhost:5000/static/screenshots/${data.ID}.png`;
      };

      return {url, screenshotURL, requestScreenshot}
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  img {
    display: block;
    width: 400px;
    max-width: 100%;
    margin: 32px auto;
  }
</style>
