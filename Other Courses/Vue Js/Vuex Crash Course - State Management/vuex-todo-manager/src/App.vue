<template>
  <div id="app">
    <div class="container">
      <AddTodo/>
      <FilterTodos/>
      <Todos/>
    </div>
  </div>
</template>

<script>
  import Todos from "./components/Todos";
  import AddTodo from "./components/AddTodo";
  import FilterTodos from "./components/FilterTodos";


  export default {
  name: 'App',
  components: {
    FilterTodos,
    AddTodo,
    Todos}
}
</script>

<style>
  body {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    line-height: 1.6;
    background: #bdcec5;
  }

  .container {
    max-width: 1100px;
    margin: auto;
    overflow: auto;
    padding: 0 2rem;
  }
</style>
