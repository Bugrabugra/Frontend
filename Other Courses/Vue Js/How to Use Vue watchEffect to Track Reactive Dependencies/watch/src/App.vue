<template>
  <div>
    <h1>Vue watchEffect Tutorial</h1>
    <textarea v-model="textContent"/>
    <p v-if="isTyping">Matt is typing...</p>
  </div>
</template>

<script setup>
  import {ref, watchEffect} from "vue";

  const textContent = ref("");
  const isTyping = ref(false);

  const stop = watchEffect((onInvalidate) => {
    if (textContent.value.length > 0) {
      isTyping.value = true;

      if (textContent.value.length > 10) {
        stop();
      }

      const showTypingStatus = setTimeout(() => {
        isTyping.value = false;
      }, 2000);

      onInvalidate(() => {
        clearInterval(showTypingStatus);
      });
    }
  })
</script>

<style>
  #app {
    font-family: "Avenir LT Std", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
