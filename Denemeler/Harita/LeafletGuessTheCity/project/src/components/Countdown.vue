<template>
  <transition appear>
    <p style="font-size: 800px" class="white--text font-weight-black">
      {{$store.getters.countdown}}
    </p>
  </transition>
</template>

<script>
  export default {
    name: "Countdown"
  }
</script>

<style scoped>
  .fade-enter-active {
    animation: bounce-in 1s;
  }

  .fade-leave-active {
    animation: bounce-in 1s reverse;
  }

  @keyframes bounce-in {
    0%, 100% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }
  }
</style>