import './App.css'
import { memo, useCallback, useMemo, useState } from "react";


const Swatch = ({ params, onClick }) => {
  console.log(`Swatch rendered ${params.color}`);

  return (
    <div style={{ margin: 2, width: 75, height: 75, backgroundColor: params.color }}
         onClick={onClick}>

    </div>
  )
};

const MemoedSwatch = memo(Swatch);

function App() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [color, setColor] = useState("red");

  console.log("App rendered: ", appRenderIndex);

  const params = useMemo(() => ({ color }), [color]);
  const onClick = useCallback(() => {}, [])

  return (
    <div className="App">
      <div>
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>
          Re-render App
        </button>

        <button onClick={() => setColor(color === "red" ? "blue" : "red")}>
          Change color
        </button>
      </div>

      <div>
        <MemoedSwatch params={params} onClick={onClick}/>
      </div>
    </div>
  )
}

export default App
