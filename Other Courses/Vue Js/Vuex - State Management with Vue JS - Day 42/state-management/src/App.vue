<template>
  <div id="app">
    <Navbar/>
    <TaskForm/>
    <TaskList/>
  </div>
</template>

<script setup>
  import Navbar from "./components/Navbar.vue";
  import TaskForm from "./components/TaskForm.vue";
  import TaskList from "./components/TaskList.vue";
</script>

<style>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }
</style>
