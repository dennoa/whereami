import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import Form from 'react-jsonschema-form'

const schema = {
  type: 'object',
  properties: {
    connectWithId: {
      type: 'string',
      title: 'Connection id',
    },
  },
}

const uiSchema = {
  connectWithId: {
    'ui:placeholder': 'Enter the connection id for someone you want to connect with',
  },
}

class Connect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined,
      connectedTo: [],
    }
    this.connectWith = this.connectWith.bind(this)
  }

  componentWillMount() {
    this.setState({ currentUser: firebase.auth().currentUser })
    firebase.auth().onAuthStateChanged(() => {
      this.setState({ currentUser: firebase.auth().currentUser })
    })
  }

  connectWith(form) {
    const { connectWithId } = form.formData
    if (connectWithId) {
      // Connect to that user
    }
  }

  render() {
    if (!this.state.currentUser) {
      return <div className="container section">You need to login first!</div>
    }
    return (
      <div className="container">
        <div className="section">
          <Form schema={schema} uiSchema={uiSchema} showErrorList={false} onSubmit={this.connectWith}>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Connect
            </button>
          </Form>
        </div>
        <div className="section">
          <p>
            Your connection id is <code>{this.state.currentUser.uid}</code>
          </p>
          <p>Let someone know your connection id to let them connect with you.</p>
        </div>
        <div className="section">
          Already connected with:
          <ul>{this.state.connectedTo.map(id => <li key={id}>{id}</li>)}</ul>
        </div>
      </div>
    )
  }
}

Connect.propTypes = {
  history: PropTypes.object,
}

export default Connect
