
import {
  AppBar,
  Toolbar,
} from "@mui/material";

import Layout from './containers/Layout'
import CodexPage from './Pages/Codex'
import Page404 from './Pages/Page404'

import {Switch, Route, BrowserRouter, Link, Redirect} from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CodexPage} />

          <Route path="*" component={Page404} status={404} />
        </Switch>
      </BrowserRouter>
    </Layout>
  )
}

export default App
