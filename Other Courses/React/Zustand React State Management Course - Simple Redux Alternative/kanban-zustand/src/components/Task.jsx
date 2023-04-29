import React from 'react';
import "./Task.css";
import classNames from "classnames";
import { useStore } from "../store.js";
import trash from "../assets/trash-2.svg";


const Task = ({ title }) => {
  const task = useStore(store => store.tasks.find(task => task.title === title))
  const deleteTask = useStore(store => store.deleteTask)

  return (
    <div className="task" draggable>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} alt="trash" onClick={() => deleteTask(title)} />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
};

export default Task;
