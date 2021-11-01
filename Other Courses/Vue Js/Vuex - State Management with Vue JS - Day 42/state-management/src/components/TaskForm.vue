<template>
  <div class="form">
    <input type="text" v-model="task" placeholder="Enter a task you need to do...">
    <button @click="newTask">ADD</button>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {useStore} from "vuex";

  const store = useStore();
  const task = ref("");
  const newTask = () => {
    store.commit("newTask", task.value);
    task.value = "";
  };
</script>

<style scoped>
  .form {
    width: 100vw;
    height: 25px;
    display: flex;
    align-items: stretch;
    margin: 0;
  }

  .form input {
    flex: 1;
  }
</style>