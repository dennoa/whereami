import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import firebase from 'firebase'

const Navbar = props => {
  const logout = () => {
    firebase.auth().signOut()
    props.history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
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
          {props.currentUser ? (
            <div className="navbar-nav">
              <div className="nav-item dropdown">
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <button className="btn btn-link dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-item nav-link" to="/connect">
                Connect
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
}

export default Navbar
