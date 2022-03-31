import React, { useRef } from "react";
import './App.css'
import { useReactToPrint } from 'react-to-print';

const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>My cool content here!</div>
  );
});

const Example = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print this out!</button>
      <ComponentToPrint ref={componentRef} />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Example/>
    </div>
  )
};

export default App
