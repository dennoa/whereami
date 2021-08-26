import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import NoSleep from 'nosleep.js/dist/NoSleep'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined,
      wakeLockOn: false,
    }
    this.handleUserChange = this.handleUserChange.bind(this)
    this.toggleNoSleep = this.toggleNoSleep.bind(this)
    this.noSleep = new NoSleep()
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  handleUserChange(currentUser) {
    this.setState({ currentUser })
  }

  toggleNoSleep() {
    if (this.state.wakeLockOn) {
      this.noSleep.disable()
    } else {
      this.noSleep.enable()
    }
    this.setState({ wakeLockOn: !this.state.wakeLockOn })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Where am I
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            {this.state.currentUser ? (
              <div className="navbar-nav">
                <Link className="nav-item nav-link" onClick={this.toggleNoSleep} to="/">
                  Awake {this.state.wakeLockOn ? 'Yes' : 'No'}
                </Link>
                <Link className="nav-item nav-link" to="/connect">
                  Connect
                </Link>
                <Link className="nav-item nav-link" to="/profile">
                  Profile
                </Link>
                <Link className="nav-item nav-link" to="/logout">
                  Logout
                </Link>
              </div>
            ) : (
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
