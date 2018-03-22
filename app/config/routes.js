import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga'
import firebase from 'firebase'

import Navbar from 'Components/navbar'
import Footer from 'Components/footer'
import Home from 'Views/home'
import Login from 'Views/login'
import Connect from 'Views/connect'
import ManageConnection from 'Views/manage-connection'
import Profile from 'Views/profile'
import HelpHow from 'Views/help-how'
import Error404 from 'Views/404'
import ScrollTop from 'Components/scrollTop'
import Refresh from 'Components/refresh'

ReactGA.initialize('UA-00000000-0')

const history = createHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined,
    }
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    const auth = firebase.auth()
    this.handleUserChange(auth.currentUser)
    auth.onAuthStateChanged(this.handleUserChange)
  }

  componentDidMount() {
    document.getElementById('loader').remove()
  }

  handleUserChange(currentUser) {
    this.setState({ currentUser })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar history={history} currentUser={this.state.currentUser} />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/connect" component={Connect} />
          <Route
            path="/manage-connection/:id"
            component={ManageConnection}
            currentUser={this.state.currentUser}
            history={history}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/help-how" component={HelpHow} />
          <Route path="/404" component={Error404} />
          <Footer />
          <ScrollTop />
          <Refresh path="/refresh" />
        </div>
      </Router>
    )
  }
}

export default Routes
