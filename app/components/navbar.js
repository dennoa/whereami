import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import md5 from 'crypto-js/md5'
import { getToken, decodeToken, removeToken } from 'Helpers/auth'

const Navbar = props => {
  const logout = () => {
    removeToken()
    props.history.push('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to={getToken() ? '/dashboard' : '/'} className="navbar-brand">
          <svg viewBox="0 0 512 512">
            <g>
              <path d="M400.268,175.599c-1.399-3.004-4.412-4.932-7.731-4.932h-101.12l99.797-157.568c1.664-2.628,1.766-5.956,0.265-8.678C389.977,1.69,387.109,0,384.003,0H247.47c-3.234,0-6.187,1.826-7.637,4.719l-128,256c-1.323,2.637-1.178,5.777,0.375,8.294c1.562,2.517,4.301,4.053,7.262,4.053h87.748l-95.616,227.089c-1.63,3.883-0.179,8.388,3.413,10.59c1.382,0.845,2.918,1.254,4.446,1.254c2.449,0,4.864-1.05,6.537-3.029l273.067-324.267C401.206,182.161,401.667,178.611,400.268,175.599z" />
            </g>
          </svg>
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
          {getToken() ? (
            <div className="navbar-nav">
              <div className="nav-item dropdown">
                <button
                  className="btn btn-link nav-link dropdown-toggle user-dropdown"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div
                    className="user-avatar"
                    style={{
                      backgroundImage: `url(https://secure.gravatar.com/avatar/${md5(
                        decodeToken().email
                      )}?default=mm&secure=true&size=92)`,
                    }}
                  />
                  <div className="user-text">
                    <span className="user-text-username">{decodeToken().email}</span>
                    <span className="user-text-role">Admin</span>
                  </div>
                  <span className="badge badge-danger">9</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/dashboard/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/dashboard/notifications">
                    Notifications <span className="badge badge-danger ml-1">9</span>
                  </Link>
                  <a
                    className="dropdown-item"
                    href="https://www.zendesk.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Help Center
                  </a>
                  <div className="dropdown-divider" />
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
              <Link className="btn btn-outline-light ml-3" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  history: PropTypes.object,
}

export default Navbar
