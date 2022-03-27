import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./Snackbar.css";

const Snackbar = forwardRef(({message, type}, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000)
    }
  }))

  return (
    <div
      className="snackbar"
      id={showSnackbar ? "show" : "hide"}
      style={{backgroundColor: type === "success" ? "#00d593" : "#ff0033"}}
    >
      <div className="symbol">
        {type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="message">{message}</div>
    </div>
  )
});

export default Snackbar;
