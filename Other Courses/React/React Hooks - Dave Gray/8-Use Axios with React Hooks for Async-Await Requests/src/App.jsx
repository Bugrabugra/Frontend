import { useState } from 'react'
import Jokes from "./components/Jokes";
import Posts from "./components/Posts";

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="App">
      <h1>useAxios Hooks</h1>
      <Jokes />
      <Posts />
    </main>
  )
}

export default App
