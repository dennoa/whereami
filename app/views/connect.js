import React, { Component } from 'react'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

const connectWithSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', title: 'Their connection id' },
  },
}

const connectWithUiSchema = {
  id: { 'ui:placeholder': 'Enter the connection id for someone you want to connect with' },
}

const yourDetailsSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Your name' },
  },
}

const yourDetailsUiSchema = {
  name: { 'ui:placeholder': 'Enter the name to show on the map for yourself' },
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
    this.saveYourDetails = this.saveYourDetails.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    const auth = firebase.auth()
    this.handleUserChange(auth.currentUser)
    auth.onAuthStateChanged(this.handleUserChange)
  }

  connectWith(form) {
    const { id } = form.formData
    const { currentUser } = firebase.auth()
    if (id && currentUser) {
      const db = firebase.database()
      let name = this.state.myDetails.name || currentUser.displayName
      const conn1 = db.ref(`connections/${id}/${currentUser.uid}`).set({ name })
      conn1.then(() => {
        const user = db.ref(`users/${id}`).once('value')
        user.then(snashot => {
          const val = snashot.val() || {}
          name = val.name || 'unknown'
          db.ref(`connections/${currentUser.uid}/${id}`).set({ name })
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

  saveYourDetails(form) {
    const { name } = form.formData
    const { currentUser } = firebase.auth()
    if (name && currentUser) {
      const myDetails = { name }
      this.setState({ myDetails })
      const db = firebase.database()
      db.ref(`users/${currentUser.uid}`).set(myDetails)
    }
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      this.setState({ myConnectionId: currentUser.uid })
      const db = firebase.database()
      db.ref(`connections/${currentUser.uid}`).on('value', snapshot => {
        const val = snapshot.val() || {}
        const myConnections = Object.keys(val).map(id => ({ id, name: val[id].name }))
        this.setState({ myConnections })
      })
      db.ref(`users/${currentUser.uid}`).once('value', snapshot => {
        const val = snapshot.val()
        const myDetails = val || { name: currentUser.displayName }
        this.setState({ myDetails })
        if (!val) {
          db.ref(`users/${currentUser.uid}`).set(myDetails)
        }
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
          <h3>Connect with someone</h3>
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
          <h3>Your details</h3>
          Your connection id is <code>{this.state.myConnectionId}</code>. Let someone know your connection id to let
          them connect with you.
          <hr />
          <Form
            schema={yourDetailsSchema}
            uiSchema={yourDetailsUiSchema}
            formData={this.state.myDetails}
            showErrorList={false}
            onSubmit={this.saveYourDetails}
          >
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Save
            </button>
          </Form>
        </div>
        <div className="section">
          <h3>Already connected with</h3>
          {this.state.myConnections.map(conn => (
            <div key={conn.id} className="row">
              <div className="col-sm-5">{conn.name}</div>
              <div className="col-sm-5">{conn.id}</div>
              <div className="col-sm-2 text-right">
                <button className="btn btn-danger btn-sm" onClick={this.removeConnected(conn.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          {this.state.myConnections.length === 0 && <p>Nobody yet.</p>}
        </div>
      </div>
    )
  }
}

export default Connect
