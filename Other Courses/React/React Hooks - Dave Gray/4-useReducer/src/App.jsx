import { useState, useReducer } from 'react'
import './App.css'

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.NEW_USER_INPUT:
      return { ...state, userInput: action.payload };
    case ACTION.TG_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error();
  }
};

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  NEW_USER_INPUT: "newUserInput",
  TG_COLOR: "tgColor"
}

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    {
      count: 0 ,
      userInput: "",
      color: false
    }
  );

  const [userInput, setUserInput] = useState("");
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(false);

  return (
    <main className="App" style={{color: state.color ? "#000" : "#aaa"}}>
      <input
        type="text"
        value={state.userInput}
        onChange={(e) => dispatch({type: ACTION.NEW_USER_INPUT, payload: e.target.value})}
      />
      <br/>
      <br/>
      <p>{state.count}</p>
      <section>
        <button onClick={(() => dispatch({ type: ACTION.DECREMENT }))}>-</button>
        <button onClick={(() => dispatch({ type: ACTION.INCREMENT }))}>+</button>
        <button onClick={(() => dispatch({ type: ACTION.TG_COLOR }))}>Color</button>
      </section>
      <br /><br />
      <p>{state.userInput}</p>
    </main>
  )
}

export default App
