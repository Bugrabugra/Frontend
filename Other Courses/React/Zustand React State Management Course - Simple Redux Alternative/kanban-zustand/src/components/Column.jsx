import React, { useState } from 'react';
import "./Column.css";
import Task from "./Task.jsx";
import { useStore } from "../store.js";
import { shallow } from "zustand/shallow";


const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const tasks = useStore(store => store.tasks.filter(task => task.state === state), shallow);
  const addTask = useStore(store => store.addTask);

  // const shallowFunc = (prev, next) => {
  //   const longest = prev.length > next.length ? prev.length : next.length;
  //
  //   for (let i = 0; i < longest; i++) {
  //     if (!prev[i] || !next[i]) {
  //       return false;
  //     }
  //     if (prev[i] !== next[i]) {
  //       return false;
  //     }
  //     return true;
  //   }
  // }

  return (
    <div
      className="column" onDragOver={event => {
      event.preventDefault();
    }} onDrop={event => {
      console.log("drop")
    }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map(task => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && <div className="Modal">
        <div className="modalContent">
          <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
          <button
            onClick={() => {
              addTask(text, state);
              setText("");
              setOpen(false);
            }}
          >Submit
          </button>
        </div>
      </div>}
    </div>
  );
};

export default Column;
