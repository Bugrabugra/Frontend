<template>
  <div id="app">
    <main>
      <!--Header-->
      <header>
        <h1>Scroll Progress Bar</h1>
      </header>
      <!--Progress bar-->
      <ProgressBar :progress="progress"/>
      <!--Post-->
      <Post @progressUpdate="setProgress"/>
    </main>
  </div>
</template>

<script>
  import Post from "./components/Post";
  import ProgressBar from "./components/ProgressBar";
  import {ref} from "vue";


  export default {
    name: 'App',
    components: {
      ProgressBar,
      Post
    },
    setup() {
      const progress = ref(0);

      const setProgress = (prog) => {
        progress.value = prog;
      }

      return {setProgress, progress}
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }

  header {
    background-color: #313131;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header h1 {
    color: #fff;
    font-size: 28px;
    text-align: center;
  }
</style>
