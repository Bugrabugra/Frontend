<template>
  <div>
    <i>"{{quote}}"</i>
    <p>- Kanye West</p>
    <p>
      <button @click="createPost">Create Post</button>
    </p>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import KanyeAPI from "./services/KanyeAPI";
  import axios from "axios";


  const quote = ref("");
  // async/await
  const loadQuote = async () => {
    try {
      const response = await KanyeAPI.getQuote();
      quote.value = response.data.quote;
    } catch (error) {
      console.log(error);
    }
  };

  loadQuote();

  const createPost = async () => {
    const response = await KanyeAPI.createPost(
        JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1
        })
    );
    console.log(response.data)
  };

  // then
  // axios
  //     .get("https://api.kanye.rest/")
  //     .then(response => {
  //       // handle response
  //       quote.value = response.data.quote;
  //     })
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
</style>
