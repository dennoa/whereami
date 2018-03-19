import React, { Component } from 'react'

import WhereMap from 'Components/whereMap'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myPosition: { lat: 0, lng: 0 },
      myName: 'Denno',
    }
    this.watchPositionId = undefined
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePositionChange, this.handleError)
      this.watchPositionId = navigator.geolocation.watchPosition(this.handlePositionChange, this.handleError)
    }
  }

  componentWillUnmount() {
    if (this.watchPositionId) {
      navigator.geolocation.clearWatch(this.watchPositionId)
    }
  }

  handlePositionChange(position) {
    const { latitude, longitude } = position.coords
    this.setState({ myPosition: { lat: latitude, lng: longitude } })
  }

  handleError(err) {
    console.log(err)
  }

  render() {
    const { myName, myPosition } = this.state

    return (
      <div>
        <div className="container">
          <WhereMap
            containerElement={<div style={{ height: '800px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            center={myPosition}
            markers={[
              {
                key: 'me',
                position: myPosition,
                label: myName[0],
                title: myName,
              },
            ]}
          />
        </div>
      </div>
    )
  }
}

export default Home
