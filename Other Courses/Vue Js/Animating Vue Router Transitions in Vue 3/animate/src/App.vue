<template>
  <div class="content">
    <router-link to="/">Home</router-link>
    <router-link :to="{name: 'Guide'}">Guide</router-link>

    <router-view v-slot="{Component, route}">
      <transition
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
      >
        <component :is="Component"/>
      </transition>

      <!--<transition name="fade" mode="out-in">-->
      <!--  <component :is="Component"/>-->
      <!--</transition>-->
    </router-view>
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .content {
    width: 40%;
    min-width: 500px;
    margin: 0 auto;
    position: relative;
  }

  .page {
    position: absolute;
    top: 30px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin-right: 1em;
  }

  a:hover,
  a.router-link-active {
    border-bottom: 2px solid #3498db;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-out;
  }
</style>
