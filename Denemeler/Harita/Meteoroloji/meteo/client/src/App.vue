<template>
  <Modal v-if="showModal" :content="modalContent"/>
  <router-view class="relative"/>
</template>

<script setup>
  import Modal from "./components/Global/Modal.vue";
  import {computed} from "vue";
  import {useStore} from "vuex";

  // store
  const store = useStore();

  // computed
  const showModal = computed(() => {
    return store.state.general.isModalOpen;
  });

  const modalContent = computed(() => {
    return store.state.general.modalContent;
  });

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
