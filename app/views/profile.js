import React, { Component } from 'react'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

import onValue from 'Helpers/on-value'

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
    }
    this.saveYourDetails = this.saveYourDetails.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    const auth = firebase.auth()
    this.handleUserChange(auth.currentUser)
    auth.onAuthStateChanged(this.handleUserChange)
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
      <div className="container section">
        <p>
          Your connection id is <code>{this.state.myConnectionId}</code>
        </p>
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
    )
  }
}

export default Connect
