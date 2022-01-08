import React, { useState } from "react";
import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";
import {ReactQueryDevtools} from "react-query/devtools";


const App = () => {
  const [page, setPage] = useState("planets");

  const changePage = (page) => {
    setPage(page);
  };
  return (
    <div className="App">
      <h1>Star Wars Info</h1>
      <Navbar onChangePage={changePage}/>
      <div className="content">
        {page === "planets" ? <Planets/> : <People/>}
      </div>
      <ReactQueryDevtools initialIsOpen={false}/>
    </div>
  )
}

export default App
