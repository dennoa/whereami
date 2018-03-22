import React, { Component } from 'react'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

import onValue from 'Helpers/on-value'

const myDetailsSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Your name' },
    markerColor: { type: 'string', title: 'Your marker colour' },
  },
}

const myDetailsUiSchema = {
  name: { 'ui:placeholder': 'Enter the name to show on the map for yourself' },
  markerColor: { 'ui:widget': 'color' },
}

class Connect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myConnectionId: undefined,
      myDetails: {},
    }
    this.save = this.save.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  save(form) {
    const { name, markerColor } = form.formData
    const { currentUser } = firebase.auth()
    if (name && currentUser) {
      const myDetails = { name, markerColor }
      this.setState({ myDetails })
      const db = firebase.database()
      db.ref(`users/${currentUser.uid}`).set(myDetails)
    }
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      this.setState({ myConnectionId: currentUser.uid })
      onValue(`users/${currentUser.uid}`, val => {
        const myDetails = val || { name: currentUser.displayName, markerColor: '#ff0000' }
        this.setState({ myDetails })
      })
    }
  }

  render() {
    if (!this.state.myConnectionId) {
      return <div className="container-fluid section">You need to login first!</div>
    }

    const { name } = this.state.myDetails
    const names = name ? `${name}'s` : 'Your'

    return (
      <div className="container-fluid section">
        <p>
          {names} connection id: <code>{this.state.myConnectionId}</code>
        </p>
        <hr />
        <Form
          schema={myDetailsSchema}
          uiSchema={myDetailsUiSchema}
          formData={this.state.myDetails}
          showErrorList={false}
          onSubmit={this.save}
        >
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Save
          </button>
        </Form>
      </div>
    )
  }
}

export default Connect
