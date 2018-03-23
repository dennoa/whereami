import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withStateHandlers } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const WhereMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAf79r2oUgm8nrNXr_bgcoulliocHQoExY&libraries=places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: `${Math.round(window.screen.availHeight * 0.75)}px` }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen }),
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={props.defaultZoom || 15} defaultCenter={props.defaultCenter}>
    {(props.markers || []).map(marker => (
      <Marker
        key={marker.key}
        position={marker.position}
        label={marker.label}
        icon={marker.icon}
        title={marker.title}
        onClick={props.onToggleOpen}
      >
        {props.isOpen && (
          <InfoWindow onCloseClick={props.onToggleOpen}>
            <div>{marker.title}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
))

WhereMap.propTypes = {
  defaultCenter: PropTypes.object.isRequired,
  defaultZoom: PropTypes.number,
  markers: PropTypes.array,
}

export default WhereMap
