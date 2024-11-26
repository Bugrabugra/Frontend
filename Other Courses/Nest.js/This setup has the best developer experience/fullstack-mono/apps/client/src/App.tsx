import { useState } from "react";

import "./App.css";
import TodoList from "./components/todo-list.tsx";
import TodoItem from "./components/todo-item.tsx";
import CreateTodo from "./components/create-todo.tsx";

function App() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <h1>Todos</h1>
      <div style={{ display: "flex", gap: 20, textAlign: "left" }}>
        <TodoList onItemClick={(id) => setActive(id)} />
        {active ? (
          <TodoItem id={active} setActive={setActive} />
        ) : (
          "Click an item to view"
        )}
        <CreateTodo />
      </div>
    </>
  );
}

export default App;
