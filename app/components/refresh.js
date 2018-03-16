import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const Refresh = ({ path = '/' }) => (
  <Route
    path={path}
    component={({ history, location, match }) => {
      history.replace({
        ...location,
        pathname: location.pathname.substring(match.path.length),
      })
      return null
    }}
  />
)

Refresh.propTypes = {
  path: PropTypes.string,
}

export default Refresh
