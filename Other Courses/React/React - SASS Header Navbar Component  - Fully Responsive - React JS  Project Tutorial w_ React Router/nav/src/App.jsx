import { Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import Layout from "./components/LAyout"
import Home from "./pages/Home"
import PageCTA from "./pages/PageCTA"
import PageOne from "./pages/PageOne"
import PageThree from "./pages/PageThree"
import PageTwo from "./pages/PageTwo"

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>

        <Route path="/page-one" exact>
          <PageOne/>
        </Route>

        <Route path="/page-two" exact>
          <PageTwo/>
        </Route>

        <Route path="/page-three" exact>
          <PageThree/>
        </Route>

        <Route path="/page-cta" exact>
          <PageCTA/>
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
