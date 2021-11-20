import React, {useState} from 'react';
import Button from "./components/UI/Button/Button";
import './App.css';
import Demo from "./components/Demo/Demo";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP running")

  const toggleParagraphHandler = () => {
    setShowParagraph(prevState => !prevState);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <Demo show={false}/>
      <Button onClick={toggleParagraphHandler}>
        Toggle Paragraph!
      </Button>
    </div>
  );
}

export default App;
