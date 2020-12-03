<template>
  <h1>Ninja Reaction Timer</h1>
  <button @click="start" :disabled="isPlaying">play</button>
  <Results :score="score" v-if="showResults"/>
  <Block v-if="isPlaying" :delay="delay" @end="endGame"/>
</template>

<script>
import Block from "./components/Block";
import Results from "./components/Results";


export default {
  name: 'App',

  components: {
    Results,
    Block
  },

  data() {
    return {
      isPlaying: false,
      delay: null,
      score: null,
      showResults: false
    }
  },

  methods: {
    start() {
      this.isPlaying = true;
      this.delay = 2000 + Math.random() * 5000;
      this.showResults = false;
    },

    endGame(reactionTime) {
      this.score = reactionTime;
      this.isPlaying = false;
      this.showResults = true;
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #444;
    margin-top: 60px;
  }

  button {
    background: #0faf87;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: 1px;
    cursor: pointer;
    margin: 10px;
  }

  button[disabled] {
    opacity: 0.2;
    cursor: not-allowed;
  }
</style>
