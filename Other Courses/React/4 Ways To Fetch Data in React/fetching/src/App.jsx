import './App.css'
import { Suspense } from "react";
import Fetch from "./components/Fetch";
import Axios from "./components/Axios";
import Swr from "./components/Swr";
import ReactQuery from "./components/ReactQuery";


function App() {
  return (
    <div className="App">
      <Fetch/>
      <Axios/>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Swr/>
      </Suspense>
      <ReactQuery/>
    </div>
  )
}

export default App
