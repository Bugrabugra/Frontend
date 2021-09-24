<template>
  <div class="root">
    <button @click="isOpen = true">
      Open
    </button>

    <teleport to="body">
      <div v-if="isOpen" class="modal">
        <ModalContent @close="isOpen = false" msg="I hope so!" title="Does this work?"/>
      </div>
    </teleport>

  </div>
</template>

<script>
  import {ref} from "vue";
  import ModalContent from "./ModalContent.vue";


  export default {
    name: "NotificationHandler",
    components: {ModalContent},
    setup() {
      const isOpen = ref(false);

      return {isOpen}
    }
  }
</script>

<style scoped>
  .root {
    position: relative;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal > div {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
  }
</style>