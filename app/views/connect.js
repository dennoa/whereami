import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

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
      myConnectionId: undefined,
      myDetails: {},
      myConnections: [],
    }
    this.connectWith = this.connectWith.bind(this)
    this.removeConnected = this.removeConnected.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  connectWith(form) {
    const { id } = form.formData
    const { currentUser } = firebase.auth()
    if (id && currentUser) {
      const db = firebase.database()
      const markerColor = '#ff0000'
      let name = this.state.myDetails.name || currentUser.displayName
      const conn1 = db.ref(`connections/${id}/${currentUser.uid}`).set({ name, markerColor })
      conn1.then(() => {
        const user = db.ref(`users/${id}`).once('value')
        user.then(snashot => {
          const val = snashot.val() || {}
          name = val.name || 'unknown'
          db.ref(`connections/${currentUser.uid}/${id}`).set({ name, markerColor })
          const myConnections = this.state.myConnections.filter(existing => existing.id !== id).concat([{ id, name }])
          this.setState({ myConnections })
        })
      })
    }
  }

  removeConnected(id) {
    return () => {
      const { currentUser } = firebase.auth()
      if (currentUser) {
        const myConnections = this.state.myConnections.filter(existing => existing === id)
        this.setState({ myConnections })
        const db = firebase.database()
        db.ref(`connections/${currentUser.uid}/${id}`).remove()
        db.ref(`connections/${id}/${currentUser.uid}`).remove()
      }
    }
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      this.setState({ myConnectionId: currentUser.uid })
      onValue(`connections/${currentUser.uid}`, value => {
        const val = value || {}
        const myConnections = Object.keys(val).map(id => ({ id, name: val[id].name }))
        this.setState({ myConnections })
      })
      onValue(`users/${currentUser.uid}`, val => {
        const myDetails = val || { name: currentUser.displayName }
        this.setState({ myDetails })
      })
    }
  }

  render() {
    if (!this.state.myConnectionId) {
      return <div className="container section">You need to login first!</div>
    }
    return (
      <div className="container">
        <div className="section">
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
