import React, { Component } from 'react'
import firebase from 'firebase'
import moment from 'moment'

import WhereMap from 'Components/whereMap'
import onValue from 'Helpers/on-value'

const whenFormat = 'h:mma ddd Do MMMM YYYY'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myId: '',
      myLocation: { lat: 0, lng: 0, when: Date.now() },
      myDetails: { name: ' ' },
      myConnections: [],
    }
    this.watchPositionId = undefined
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.toMarker = this.toMarker.bind(this)
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePositionChange, this.handleError)
      this.watchPositionId = navigator.geolocation.watchPosition(this.handlePositionChange, this.handleError)
    }
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  componentWillUnmount() {
    if (this.watchPositionId) {
      navigator.geolocation.clearWatch(this.watchPositionId)
    }
  }

  handlePositionChange(position) {
    const { latitude, longitude } = position.coords
    const myLocation = { lat: latitude, lng: longitude, when: Date.now() }
    this.setState({ myLocation })
    const { currentUser } = firebase.auth()
    if (currentUser) {
      firebase
        .database()
        .ref(`locations/${currentUser.uid}`)
        .set(myLocation)
    }
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      this.setState({ myId: currentUser.uid })
      onValue(`connections/${currentUser.uid}`, connValue => {
        const connVal = connValue || {}
        const myConnections = Object.keys(connVal).map(id => ({ id, name: connVal[id].name }))
        myConnections.forEach(conn => {
          onValue(`locations/${conn.id}`, locValue => {
            conn.location = locValue
            this.setState({ myConnections })
          })
        })
      })
      onValue(`users/${currentUser.uid}`, val => {
        const myDetails = val || { name: currentUser.displayName }
        this.setState({ myDetails })
      })
    }
  }

  handleError(err) {
    console.log(err)
  }

  toMarker(conn) {
    const location = conn.location || { lat: 0, lng: 0, when: Date.now() }
    const name = conn.name || ' '
    return {
      key: conn.id,
      position: location,
      label: name[0],
      title: `${name} at ${moment(location.when).format(whenFormat)}`,
    }
  }

  render() {
    const { myId, myDetails, myLocation, myConnections } = this.state
    const markers = [this.toMarker({ id: myId, location: myLocation, name: myDetails.name })]
    myConnections.forEach(conn => markers.push(this.toMarker(conn)))

    return (
      <div>
        <div className="container-fluid">
          <WhereMap
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            center={myLocation}
            markers={markers}
          />
        </div>
      </div>
    )
  }
}

export default Home
