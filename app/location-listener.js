import firebase from 'firebase'

function toLocation(position) {
  const pos = position || {}
  const { latitude, longitude, altitude } = pos.coords
  return {
    lat: latitude,
    lng: longitude,
    alt: altitude,
    timestamp: pos.timestamp || Date.now(),
  }
}

function onError(err) {
  console.log(err)
}

function onPosition(position) {
  const currentLocation = toLocation(position)
  const { currentUser } = firebase.auth()
  if (currentUser) {
    firebase
      .database()
      .ref(`locations/${currentUser.uid}`)
      .set(currentLocation)
  }
}

const options = { enableHighAccuracy: true }

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onPosition, onError, options)
  navigator.geolocation.watchPosition(onPosition, onError, options)
}
