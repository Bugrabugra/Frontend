import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
