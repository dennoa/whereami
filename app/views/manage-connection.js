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
    this.backToConnect = this.backToConnect.bind(this)
    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  componentWillMount() {
    const auth = firebase.auth()
    this.handleUserChange(auth.currentUser)
    auth.onAuthStateChanged(this.handleUserChange)
  }

  backToConnect() {
    this.props.history.push('/connect')
  }

  save(form) {
    const { name } = form.formData
    const { myConnectionId, otherConnectionId } = this.state
    if (myConnectionId && otherConnectionId) {
      const db = firebase.database()
      db.ref(`connections/${myConnectionId}/${otherConnectionId}`).set({ name })
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
    if (!this.state.myConnectionId) {
      return <div className="container-fluid section">Loading...</div>
    }
    return (
      <div className="container-fluid section">
        <p>
          Their connection id is <code>{this.state.otherConnectionId}</code>
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
            Leave it
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
