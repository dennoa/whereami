import React, { Component } from 'react'
import firebase from 'firebase'
import moment from 'moment'

import WhereMap from 'Components/whereMap'
import onValue from 'Helpers/on-value'

const timestampFormat = 'h:mma, dddd Do MMMM YYYY'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myId: undefined,
      myLocation: undefined,
      myDetails: undefined,
      myConnections: [],
    }
    this.handleUserChange = this.handleUserChange.bind(this)
    this.toMarker = this.toMarker.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      this.setState({ myId: currentUser.uid })
      onValue(`connections/${currentUser.uid}`, connValue => {
        const connVal = connValue || {}
        const myConnections = Object.keys(connVal).map(id => Object.assign({ id }, connVal[id]))
        myConnections.filter(conn => !conn.hide).forEach(conn => {
          onValue(`locations/${conn.id}`, locValue => {
            conn.location = locValue
            this.setState({ myConnections })
          })
        })
      })
      onValue(`users/${currentUser.uid}`, myDetails => {
        this.setState({ myDetails })
      })
      onValue(`locations/${currentUser.uid}`, myLocation => {
        this.setState({ myLocation })
      })
    }
  }

  toMarker(conn) {
    const location = conn.location || { lat: 0, lng: 0, alt: 0, timestamp: Date.now() }
    const name = conn.name || ' '
    const position = { lat: location.lat, lng: location.lng }
    return {
      key: conn.id,
      position,
      label: name[0],
      title: `${name} at ${moment(location.timestamp).format(timestampFormat)}`,
      icon: {
        path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
        fillColor: conn.markerColor || '#ff0000',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1,
      },
    }
  }

  render() {
    if (!firebase.auth().currentUser) {
      return <div className="container section">Please login</div>
    }

    const { myId, myDetails, myLocation, myConnections } = this.state
    if (!myId || !myDetails || !myLocation) {
      return (
        <div className="container section">
          <p>Loading...</p>
          <p>
            If this takes more than 30 seconds or so you could try refreshing the page and logging in again. If still no
            luck, there might be a problem with your connection.
          </p>
        </div>
      )
    }
    const markers = [
      this.toMarker({ id: myId, location: myLocation, name: myDetails.name, markerColor: myDetails.markerColor }),
    ]
    myConnections.forEach(conn => markers.push(this.toMarker(conn)))
    const defaultCenter = { lat: myLocation.lat, lng: myLocation.lng }
    return <WhereMap defaultCenter={defaultCenter} markers={markers} />
  }
}

export default Home
