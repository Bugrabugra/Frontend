import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

const getArray = () => {
  for (let i = 0; i < 100000000; i++) {
    // do something expensive
  }
  return ["Dave", "Gray"];
}

function App() {
  const [userNumber, setUserNumber] = useState("");
  const [randomInput, setRandomInput] = useState("");

  const fib = useCallback((n) => {
    return (n <= 1) ? n : fib(n - 1) + fib(n - 2);
  }, [])

  const fibNumber = useMemo(() => fib(userNumber), [userNumber, fib]);
  // const fibNumber = fib(userNumber);

  useEffect(() => {
    console.log("New Number")
  }, [fibNumber, fib]);

  // ------------second--------------
  const myArray = useMemo(() => getArray(), []);

  useEffect(() => {
    console.log("New Array")
  }, [myArray]);

  return (
    <main className="App">
      <label>Fibonacci Sequence:</label>
      <input
        type="number"
        value={userNumber}
        placeholder="Position"
        onChange={(e) => setUserNumber(e.target.value)}
      />
      <p>Number: {fibNumber || "--"}</p>

      <br/>
      <br/>

      <label>Random Input:</label>
      <input
        type="text"
        value={randomInput}
        placeholder="Random Input:"
        onChange={(e) => setRandomInput(e.target.value)}
      />
      <p>{randomInput}</p>
    </main>
  )
}

export default App
