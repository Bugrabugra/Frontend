import React, {useEffect, useImperativeHandle, useRef} from "react";
import styles from "./Input.module.css";


const Input = React.forwardRef((props, ref) => {
  const refInput = useRef();

  const activate = () => {
    refInput.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    }
  });

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={refInput}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;