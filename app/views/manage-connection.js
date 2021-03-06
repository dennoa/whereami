import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

import noUndefined from 'Helpers/no-undefined'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    markerColor: { type: 'string', title: 'Marker colour' },
    hide: { type: 'boolean', title: 'Hide' },
  },
}

const uiSchema = {
  name: { 'ui:placeholder': 'Enter a name for this person' },
  markerColor: { 'ui:widget': 'color' },
  hide: { 'ui:widget': 'radio' },
}

class ManageConnection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myConnectionId: undefined,
      otherConnectionId: props.match.params.id,
      otherConnectionDetails: {},
    }
    this.onFormError = this.onFormError.bind(this)
    this.backToConnect = this.backToConnect.bind(this)
    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.handleUserChange)
  }

  onFormError(errors) {
    console.log(errors)
  }

  backToConnect() {
    this.props.history.push('/connect')
  }

  save(form) {
    const { myConnectionId, otherConnectionId } = this.state
    if (myConnectionId && otherConnectionId) {
      const conn = Object.assign({ name: 'Unknown', markerColor: '#ff0000', hide: false }, noUndefined(form.formData))
      const db = firebase.database()
      db.ref(`connections/${myConnectionId}/${otherConnectionId}`).set(conn)
      this.backToConnect()
    }
  }

  remove() {
    const { myConnectionId, otherConnectionId } = this.state
    if (myConnectionId && otherConnectionId) {
      const db = firebase.database()
      db.ref(`connections/${myConnectionId}/${otherConnectionId}`).remove()
      db.ref(`connections/${otherConnectionId}/${myConnectionId}`).remove()
      this.backToConnect()
    }
    return false
  }

  handleUserChange(currentUser) {
    if (currentUser) {
      const myConnectionId = currentUser.uid
      const { otherConnectionId } = this.state
      const db = firebase.database()
      db.ref(`connections/${myConnectionId}/${otherConnectionId}`).once('value', snapshot => {
        const otherConnectionDetails = snapshot.val() || {}
        this.setState({ myConnectionId, otherConnectionDetails })
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

    const { name } = this.state.otherConnectionDetails
    const names = name ? `${name}'s` : 'Their'

    return (
      <div className="container-fluid section">
        <p>
          {names} connection id: <code>{this.state.otherConnectionId}</code>
        </p>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          showErrorList={false}
          formData={this.state.otherConnectionDetails}
          onSubmit={this.save}
        >
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Save
          </button>
          <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.remove}>
            Remove
          </button>
          <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={this.backToConnect}>
            No Change
          </button>
        </Form>
      </div>
    )
  }
}

ManageConnection.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
}

export default ManageConnection
