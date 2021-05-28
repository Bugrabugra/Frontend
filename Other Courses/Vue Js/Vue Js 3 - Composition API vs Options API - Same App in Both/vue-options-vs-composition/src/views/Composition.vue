<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h3>You have {{todosCount}} Todos!</h3>

    <div>
      <input
          type="text"
          placeholder="Add a Todo"
          v-model="data.newTodoName"
          @keyup.enter="addTodo"
      >
    </div>

    <div>
      <ul>
        <li v-for="(todo, index) in data.todos" :key="todo.id">
          <span>{{todo.name}}</span>
          <button @click="deleteTodo(index)">X</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {ref, reactive, computed, watch} from "vue";


  export default {
    name: 'Home',

    setup() {
      const data = reactive({
        newTodoName: "",
        todos: [
          {id: 1, name: "One"},
          {id: 2, name: "Two"},
          {id: 3, name: "Three"}
        ]
      })

      const swearWords = ["fart", "butt hair", "willy"];

      const todosCount = computed(() => {
        return data.todos.length;
      })

      const addTodo = () => {
        const newTodo = {
          id: Date.now(),
          name: data.newTodoName
        }
        data.todos.push(newTodo);
        data.newTodoName = "";
      }

      const deleteTodo = (index) => {
        data.todos.splice(index, 1);
      }

      watch(data, (newValue) => {
        if (swearWords.includes(newValue.newTodoName.toLowerCase())) {
          alert("You must never say " + newValue.newTodoName + "!");
          data.newTodoName = "";
        }
      })

      return {todosCount, addTodo, deleteTodo, data}
    }


    // },
    //
    // watch: {
    //   newTodoName(newValue) {
    //     if (this.swearWords.includes(newValue.toLowerCase())) {
    //       this.newTodoName = ""
    //       alert("You must never say " + newValue + "!")
    //     }
    //   }
    // }
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
    width: 200px;
    margin: 20px auto 0;
  }

  li {
    border: 1px solid;
    display: flex;
    margin-bottom: 10px;
  }

  li span {
    flex-grow: 1;
  }
</style>
