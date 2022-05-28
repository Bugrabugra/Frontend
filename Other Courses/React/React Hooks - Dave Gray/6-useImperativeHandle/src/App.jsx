import { useRef } from 'react'
import './App.css'
import Modal from "./Modal";

function App() {
  const modalRef = useRef();

  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  console.log("parent rendered");

  return (
    <div className="App">
      <p>Parent Component</p>
      <Modal ref={modalRef}/>
      <button onClick={handleOpenModal}>Open</button>
    </div>
  )
}

export default App
