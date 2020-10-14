import React, {Fragment, useState, useRef, useEffect} from 'react';
import TodoList from "./TodoList";
import uuidv4 from "uuid/dist/v4"

const LOCAL_STORAGE_KEY = "todoApp.todos";


function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (!name) return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    });
    todoNameRef.current.value = null;
  };

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <TodoList todos = {todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </Fragment>
  )
}

export default App;
