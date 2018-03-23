import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'
import { ToastContainer, toast } from 'react-toastify'

import noUndefined from 'Helpers/no-undefined'
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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  save(form) {
    const myDetails = Object.assign({ name: 'Unkonwn', markerColor: '#ff0000' }, noUndefined(form.formData))
    this.setState({ myDetails })
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .set(myDetails)
      .then(() => toast('Saved!'))
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      this.setState({ myConnectionId: currentUser.uid })
      onValue(`users/${currentUser.uid}`, val => {
        const myDetails = val || {}
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

    const { name } = this.state.myDetails
    const names = name ? `${name}'s` : 'Your'

    return (
      <div className="container-fluid section">
        <ToastContainer />
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
