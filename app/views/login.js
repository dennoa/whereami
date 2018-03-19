import React, { Component } from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

class Login extends Component {
  componentDidMount() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/',
    })
  }

  render() {
    return <div id="firebaseui-auth-container" />
  }
}

export default Login
