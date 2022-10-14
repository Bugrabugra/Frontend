import "./App.css"
import CakeView from "./features/cake/CakeView.jsx";
import IcecreamView from "./features/icecream/IcecreamView.jsx";
import UserView from "./features/user/UserView.jsx";


function App() {
  return (
    <div className="App">
      <CakeView/>
      <IcecreamView/>
      <UserView/>
    </div>
  )
}

export default App
