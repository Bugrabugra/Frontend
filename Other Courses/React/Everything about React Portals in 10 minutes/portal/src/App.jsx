import './App.css'
import { useState } from "react";
import Modal from "./Modal";

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <h2>Click to open Modal</h2>
      <button onClick={() => setShow(s => !s)}>Open Modal</button>
      <Modal show={show} closeModal={() => setShow(false)}/>
    </div>
  )
}

export default App
