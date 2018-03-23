import React from 'react'
import firebase from 'firebase'

function Logout() {
  firebase.auth().signOut()
  return <div className="container section">You have logged out</div>
}

export default Logout
