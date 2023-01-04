import React, { ReactNode } from 'react';
import { useCounter, useCounterText } from "./context/CounterContext";


type ChildrenType = {
  children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
  const { text, handleTextInput } = useCounterText();
  const { count, increment, decrement } = useCounter();

  return (
    <>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" onChange={handleTextInput}/>
      <h2>{text}</h2>
    </>
  );
};

export default Counter;
