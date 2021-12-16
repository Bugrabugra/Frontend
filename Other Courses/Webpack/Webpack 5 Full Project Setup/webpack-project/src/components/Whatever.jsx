const { useState } = require("react")

const Whatever = () => {
  const [state, setState] = useState("Initial state");
  
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => setState("Button clicked")}>
        Click me
      </button>
    </div>
  )
};

export default Whatever;