import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        {/*navbar*/}
        <Navbar/>
        {/*content*/}
        <div className="content">
          <Switch>
            {/*home*/}
            <Route exact path="/">
              <Home/>
            </Route>
            {/*create*/}
            <Route path="/create" >
              <Create/>
            </Route>
            {/*blog*/}
            <Route path="/blogs/:id" >
              <BlogDetails/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
