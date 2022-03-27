import './App.css'
import Snackbar from "./components/Snackbar";
import { useRef } from "react";

const SnackbarType = {
  success: "success",
  fail: "fail"
};

const App = () => {
  const snackbarRef = useRef(null);

  return (
    <div className="App">
      <button onClick={() => {snackbarRef.current.show()}} className="showSnackbarButton">Show Snackbar</button>
      <Snackbar ref={snackbarRef} message="Action Completed!" type={SnackbarType.success}/>
    </div>
  )
}

export default App;
