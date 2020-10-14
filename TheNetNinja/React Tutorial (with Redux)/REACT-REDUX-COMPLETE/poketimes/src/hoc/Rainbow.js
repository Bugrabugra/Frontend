import React from "react";

const Rainbow = (WrappedComponent) => {
  const colours = ["red", "pink", "orange", "blue", "green", "yellow"];
  const randomColour = colours[Math.floor(Math.random() * 5)];
  const classMame = randomColour + "-text";

  return (props) => {
    return (
      <div className={classMame}>
        <WrappedComponent {...props}/>
      </div>
    )
  }
}

export default Rainbow