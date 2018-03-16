import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const WhereMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: -28.65, lng: 153.61 }}>
    {props.isMarkerShown && <Marker position={{ lat: -29, lng: 153.5 }} />}
  </GoogleMap>
))

WhereMap.propTypes = {
  isMarkerShown: PropTypes.bool,
}

export default WhereMap
