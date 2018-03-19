import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const WhereMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={props.defaultZoom || 15} center={props.center}>
    {(props.markers || []).map(marker => (
      <Marker
        key={marker.key}
        position={marker.position}
        label={marker.label}
        icon={marker.icon}
        title={marker.title}
      />
    ))}
  </GoogleMap>
))

WhereMap.propTypes = {
  center: PropTypes.object.isRequired,
  defaultZoom: PropTypes.number,
  markers: PropTypes.array,
}

export default WhereMap
