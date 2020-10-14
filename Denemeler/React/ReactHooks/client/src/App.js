import React, {useState, Fragment} from 'react';
import "./style.css";


function App() {

  const [count, setCount] = useState(4);
  const [theme, setTheme] = useState("blue");

  const decrementCount = () => {
    setCount(prevCount => prevCount - 1);
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <Fragment>
      <div className="container main">
        <div className="container">
          <button onClick={decrementCount}>-</button>
          <span>{count}</span>
          <span>{theme}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
