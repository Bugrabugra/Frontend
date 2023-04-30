import React, { useState } from 'react';
import "./Column.css";
import Task from "./Task.jsx";
import { useStore } from "../store.js";
import { shallow } from "zustand/shallow";
import classNames from "classnames";


const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const tasks = useStore(store => store.tasks.filter(task => task.state === state), shallow);
  const addTask = useStore(store => store.addTask);
  const setDraggedTask = useStore(store => store.setDraggedTask);
  const draggedTask = useStore(store => store.draggedTask);
  const moveTask = useStore(store => store.moveTask);
  const [drop, setDrop] = useState(false);

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
      className={classNames("column", { drop: drop })}
      onDragOver={event => {
        setDrop(true);
        event.preventDefault();
      }}
      onDrop={event => {
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
      onDragLeave={event => {
        setDrop(false);
        event.preventDefault();
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
