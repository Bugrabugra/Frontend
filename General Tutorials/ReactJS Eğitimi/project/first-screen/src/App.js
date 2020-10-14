import React from 'react';
import "./app.scss"
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
import PublicLayout from "./layouts/PublicLayout";
import {BrowserRouter, Switch, Route} from "react-router-dom";


const PublicRoute = ({children, ...rest}) => {
  return (
    <Route {...rest} render={() => (
      <PublicLayout>
        {children}
      </PublicLayout>
    )
    }/>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <PublicRoute exact path="/">
            <UserList/>
          </PublicRoute>

          <PublicRoute exact path="/user-detail/:id">
            <UserDetail/>
          </PublicRoute>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
