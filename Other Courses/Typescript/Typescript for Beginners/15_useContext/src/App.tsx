import Counter from "./Counter"
import { CounterProvider, initialState } from "./context/CounterContext";

function App() {

  return (
    <>
      <CounterProvider count={initialState.count} text={initialState.text}>
        <Counter>
          {(num: number) => <>Current Count: {num}</>}
        </Counter>
      </CounterProvider>
    </>
  )
}

export default App
