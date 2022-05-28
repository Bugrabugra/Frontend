import './App.css'
import { useRef, useState } from "react";

function App() {
  const [randomInput, setRandomInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const renders = useRef(0);
  const timerId = useRef(0);

  const handleChange = (e) => {
    setRandomInput(e.target.value);
    renders.current++;
  };

  const startTimer = () => {
    timerId.current = setInterval(() => {
      renders.current++;
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      renders.current++;
      setSeconds(0);
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        value={randomInput}
        placeholder="Random Input"
        onChange={handleChange}
      />
      <p>Renders: {renders.current}</p>
      <br/>
      <section>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </section>
      <br/>
      <p>Seconds: {seconds}</p>
      <br/>
      <p>{randomInput}</p>
    </div>
  )
}

export default App
