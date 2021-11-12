import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      {/*navbar*/}
      <Navbar/>
      {/*content*/}
      <div className="content">
        <Home/>
      </div>
    </div>
  );
}

export default App;
