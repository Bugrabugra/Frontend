import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({});
  const sectionRef = useRef();

  // useEffect(() => {
  //   const random = Math.floor(Math.random() * 500);
  //
  //   for (let i = 0; i <= 100000000; i++) {
  //     if (i === 100000000) {
  //       setSectionStyle({paddingTop: `${random}px`})
  //     }
  //   }
  // }, [number]);

  useLayoutEffect(() => {
    const random = Math.floor(Math.random() * 500);

    for (let i = 0; i <= 100000000; i++) {
      if (i === 100000000) {
        setSectionStyle({paddingTop: `${random}px`})
      }
    }
  }, [number]);

  return (
    <div className="App">
      <section ref={sectionRef} style={sectionStyle}>
        <p>{number}</p>
        <div>
          <button onClick={() => setNumber(prev => prev - 1)}>-</button>
          <button onClick={() => setNumber(prev => prev + 1)}>+</button>
        </div>
      </section>
    </div>
  )
}

export default App
