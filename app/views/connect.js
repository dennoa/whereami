import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'
import { ToastContainer, toast } from 'react-toastify'

import onValue from 'Helpers/on-value'

const connectWithSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', title: 'Connection id' },
  },
}

const connectWithUiSchema = {
  id: { 'ui:placeholder': 'Enter an id to connect with' },
}

class Connect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myDetails: undefined,
      myConnections: [],
    }
    this.connectWith = this.connectWith.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  connectWith(form) {
    const { id } = form.formData
    const { currentUser } = firebase.auth()
    if (id && currentUser) {
      const db = firebase.database()
      const markerColor = '#ff0000'
      const hide = false
      let name = (this.state.myDetails || {}).name || currentUser.displayName
      const conn1 = db.ref(`connections/${id}/${currentUser.uid}`).set({ name, markerColor, hide })
      conn1.then(() => {
        const user = db.ref(`users/${id}`).once('value')
        user.then(snashot => {
          const val = snashot.val()
          if (val) {
            name = val.name || 'Unknown'
            db
              .ref(`connections/${currentUser.uid}/${id}`)
              .set({ name, markerColor, hide })
              .then(() => toast('Connected!'))
          } else {
            db
              .ref(`connections/${id}/${currentUser.uid}`)
              .remove()
              .then(() => toast('Could not find anyone with that connection id'))
          }
        })
      })
    }
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      onValue(`connections/${currentUser.uid}`, value => {
        const conn = value || {}
        const myConnections = Object.keys(conn).map(id => Object.assign({ id }, conn[id]))
        this.setState({ myConnections })
      })
      onValue(`users/${currentUser.uid}`, myDetails => {
        this.setState({ myDetails })
      })
    }
  }

  render() {
    if (!firebase.auth().currentUser) {
      return (
        <div className="container section">
          Please <Link to="/login">login</Link>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="section">
          <ToastContainer />
          <Form
            schema={connectWithSchema}
            uiSchema={connectWithUiSchema}
            showErrorList={false}
            onSubmit={this.connectWith}
          >
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Connect
            </button>
          </Form>
        </div>
        <div className="section">
          <p>Already connected with:</p>
          <ol>
            {this.state.myConnections.map(conn => (
              <li key={conn.id}>
                <Link className="nav-item nav-link" to={`/manage-connection/${conn.id}`}>
                  {conn.name}
                </Link>
              </li>
            ))}
          </ol>
          {this.state.myConnections.length === 0 && <p>Nobody yet.</p>}
        </div>
      </div>
    )
  }
}

export default Connect
