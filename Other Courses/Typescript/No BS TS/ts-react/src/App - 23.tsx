import "./App.css";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { TodosProvider, useAddTodo, useRemoveTodo, useTodos } from "./useTodos - 23";
import { render } from "react-dom";

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
);

function UL<T>({ items, render, itemClick }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement> & { items: T[], render: (item: T) => React.ReactNode, itemClick: (item: T) => void }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>{render(item)}</li>
      ))}
    </ul>
  )
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

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

      <UL
        itemClick={(item) => alert(item.id)}
        items={todos} render={(todo) => (
        <>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </>
      )}
      />

      <div>
        <input type="text" ref={newTodoRef}/>
        <Button onClick={onAddTodo} title="Add Todo"/>
      </div>
    </div>
  )
}

const JustShowTodos = () => {
  const todos = useTodos();

  return (
    <UL
      itemClick={(item) => {
      }}
      items={todos}
      render={(todo) => <>{todo.text}</>}
    />
  )
};

const AppWrapper = () => (
  <TodosProvider initialTodos={[{ id: 0, text: "Hey there useContext", done: false }]}>
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
      <App></App>
      <JustShowTodos/>
    </div>
  </TodosProvider>

);

export default AppWrapper;
