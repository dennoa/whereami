import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
  },
}

const uiSchema = {
  name: { 'ui:placeholder': 'Enter a name for this person' },
}

class ManageConnection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myConnectionId: undefined,
      otherConnectionId: props.match.params.id,
      otherConnectionDetails: {},
    }
    this.update = this.update.bind(this)
    this.removeConnected = this.removeConnected.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    const auth = firebase.auth()
    this.handleUserChange(auth.currentUser)
    auth.onAuthStateChanged(this.handleUserChange)
  }

  update(form) {
    const { name } = form.formData
    const { myConnectionId, otherConnectionId } = this.state
    if (myConnectionId && otherConnectionId) {
      const db = firebase.database()
      db.ref(`connections/${myConnectionId}/${otherConnectionId}`).set({ name })
    }
  }

  removeConnected() {
    const { myConnectionId, otherConnectionId } = this.state
    if (myConnectionId && otherConnectionId) {
      const db = firebase.database()
      db.ref(`connections/${myConnectionId}/${otherConnectionId}`).remove()
      db.ref(`connections/${otherConnectionId}/${myConnectionId}`).remove()
    }
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
    if (!this.state.myConnectionId) {
      return <div className="container section">Loading...</div>
    }
    return (
      <div className="container section">
        <p>
          Their connection id is <code>{this.state.otherConnectionId}</code>
        </p>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          showErrorList={false}
          formData={this.state.otherConnectionDetails}
          onSubmit={this.update}
        >
          <div className="row">
            <div className="col-sm-6">
              <button type="submit" className="btn btn-primary btn-lg">
                Save
              </button>
            </div>
            <div className="col-sm-6 text-right">
              <button className="btn btn-danger btn-lg" onClick={this.removeConnected}>
                Remove
              </button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

ManageConnection.propTypes = {
  match: PropTypes.object,
}

export default ManageConnection
