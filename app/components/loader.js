import React from 'react'
import PropTypes from 'prop-types'

const Loader = props => <div>{props.loading ? <span className="loader" /> : props.children}</div>

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.object,
}

export default Loader
