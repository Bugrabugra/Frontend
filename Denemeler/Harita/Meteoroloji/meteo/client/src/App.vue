<template>
  <Modal v-if="showModal" :content="modalContent"/>
  <router-view/>
</template>

<script setup>
  import Modal from "./components/Global/Modal.vue";
  import {computed} from "vue";
  import {useStore} from "vuex";


  // store
  const store = useStore();
  // references
  const user = computed(() => {
    return store.state.auth.userLoggedIn;
  })
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

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
