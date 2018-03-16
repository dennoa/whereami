import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import { decodeToken } from '../helpers/auth'

const ProtectedRoute = ({ component: Component, ...props }) => {
  let render = <Component {...props} />
  if (!decodeToken()) {
    render = (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )
  }
  return <Route {...props} render={render} />
}

ProtectedRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func.isRequired,
}

export default withRouter(ProtectedRoute)
