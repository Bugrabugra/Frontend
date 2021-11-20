import classes from "./Input.module.css";
import React from "react";


// TODO React.forwardRef diyerek o "custom" componenti refleyebiliyoruz.
// TODO Custom olmasaydı normal şekilde refleyebilirdik.
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>
        {props.label}
      </label>
      <input ref={ref} {...props.input}/>
    </div>
  );
});

export default Input;