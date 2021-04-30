import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'layout'

import Home from './Home'
import NotFound from './NotFound'
import Registrar from './AgregarPersona'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home" />}
          />
          {/* <Route
            path="/home"
            render={() => {
              if (true) {
                console.log('redirect')
                return <Redirect to="/registrar" />
              }
            }}
          /> */}
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/registrar">
            <Registrar />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
