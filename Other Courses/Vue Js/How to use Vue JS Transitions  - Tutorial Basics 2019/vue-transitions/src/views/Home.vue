<template>
  <div class="home page">
    <h1>Home Page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam laboriosam quam soluta? Dolor, laboriosam nihil.
      Adipisci alias, deserunt dolores dolorum ea esse explicabo fugiat magni minus numquam, officiis pariatur
      reiciendis repellat reprehenderit sit tenetur voluptate. Doloribus excepturi laudantium modi unde.
    </p>
    <button @click="show = !show">Animate</button>
    <transition name="img-anime">
      <div class="animate" v-show="show">
        <img src="../assets/logo.png" width="150">
      </div>
    </transition>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: 'Home',
    setup() {
      const show = ref(false);

      return {show}
    }
  }
</script>

<style lang="scss">
  .animate {
    padding: 25px 0px;
  }

  .img-anime-enter-active,
  .img-anime-leave-active {
    transition:
        transform 0.5s ease,
        opacity 0.5s ease;
  }

  .img-anime-enter-from,
  .img-anime-leave-to {
    transform:
        translateX(-100px)
        rotateZ(90deg);
    opacity: 0;
  }

  .img-anime-enter-to,
  .img-anime-leave-from {
    transform:
        translateX(0px)
        rotateZ(0deg);
    opacity: 1;
  }
</style>
