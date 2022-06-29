import "./App.css";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useTodos } from "./usetodos - 23";

const Heading = (props: { title: string }) => {
  return <h2>{props.title}</h2>
};

const Box = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ padding: "1rem", fontWeight: "bold" }}>
      {children}
    </div>
  );
};

const Button: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement> & { title?: string }> = ({ title, children, style, ...rest }) => (
  <button {...rest} style={{
    backgroundColor: "red",
    color: "white",
    fontSize: "xx-large"
  }}
  >{title ?? children}</button>
)

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: "Hey there", done: false }
  ])
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(
    () => {
      if (newTodoRef.current) {
        addTodo(newTodoRef.current.value)
        newTodoRef.current.value = "";
      }
    },
    [addTodo],
  );

  return (
    <div>
      <Heading title="Introduction"/>
      <Box>Hello there</Box>

      <Heading title="Todos"/>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef}/>
        <Button onClick={onAddTodo} title="Add Todo"/>
      </div>
    </div>
  )
}

export default App;
