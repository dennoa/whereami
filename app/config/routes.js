import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga'

import Navbar from 'Components/navbar'
import Footer from 'Components/footer'
import Home from 'Views/home'
import Login from 'Views/login'
import Connect from 'Views/connect'
import ManageConnection from 'Views/manage-connection'
import Profile from 'Views/profile'
import Help from 'Views/help'
import Error404 from 'Views/404'
import ScrollTop from 'Components/scrollTop'

ReactGA.initialize('UA-00000000-0')

const history = createHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

class Routes extends Component {
  componentDidMount() {
    document.getElementById('loader').remove()
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar history={history} />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/connect" component={Connect} />
          <Route path="/manage-connection/:id" component={ManageConnection} history={history} />
          <Route path="/profile" component={Profile} />
          <Route path="/help" component={Help} />
          <Route path="/404" component={Error404} />
          <Footer />
          <ScrollTop />
        </div>
      </Router>
    )
  }
}

export default Routes
