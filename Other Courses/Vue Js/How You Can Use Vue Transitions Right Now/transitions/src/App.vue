<template>
  <div class="main">
    <h1>Vue Transition Animation</h1>
    <!--Solution 1-->

    <!--<button @click="open = !open">Toggle Animation</button>-->
    <!--<transition name="fade" :duration="{enter: 1000, leave: 200}" appear>-->
    <!--  <p key="1" v-if="open" class="hello">-->
    <!--    Hello World-->
    <!--  </p>-->

    <!--  <p key="2" v-else class="bye">-->
    <!--    Bye World-->
    <!--  </p>-->
    <!--</transition>-->

    <!--Solution 2-->

    <!--<button @click='show = !show'> Toggle </button>-->
    <!--<transition name="rotate">-->
    <!--  <img v-if="show" src="./assets/logo.png">-->
    <!--</transition>-->

    <!--Solution 3-->
    <button @click='show = !show'> Toggle </button>
    <transition
        enter-active-class="animated fadeIn zoomIn"
        leave-active-class="animated fadeOut zoomOut"
    >
      <img v-if="show" src="./assets/logo.png">
    </transition>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const open = ref(true);
  const show = ref(true);
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin-top: 60px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .hello, .bye {
    position: absolute;
    margin: 0 auto;
    top: 200px;
  }

  @keyframes rotate {
    0% {
      opacity: 0;
      transform: scale(0) rotate(-180deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  .rotate-enter-active {
    animation: rotate 0.2s;
  }
  .rotate-leave-active {
    animation: rotate 0.2s reverse;
  }
</style>
