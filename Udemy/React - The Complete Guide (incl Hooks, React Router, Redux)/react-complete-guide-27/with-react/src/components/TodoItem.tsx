import React from 'react';
import classes from "./TodoItem.module.css";


const TodoItem: React.FC<{text: string, onRemoveTodo: () => void}> = (props) => {
  const onRemoveTodo = () => {
    console.log(event);
    
  };
  
  return (
    <li onClick={props.onRemoveTodo} className={classes.item}>
      {props.text}
    </li>
  )
}

export default TodoItem;