import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import Api from 'Helpers/api'
import { saveToken, getToken } from 'Helpers/auth'

const schema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
      title: 'Email',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
  },
}

const uiSchema = {
  username: {
    'ui:placeholder': 'Email',
    'ui:widget': 'email',
  },
  password: {
    'ui:placeholder': 'Password',
    'ui:widget': 'password',
    'ui:help': <Link to="/forgot">Forgot your password?</Link>,
  },
}

// Testing logs
const log = type => console.log.bind(console, type)

class Login extends Component {
  state = {
    redirectToReferrer: false,
  }

  login = form => {
    Api.login(form.formData)
      .then(res => {
        saveToken(res.data.token)
        this.setState({ redirectToReferrer: true })
      })
      .catch(err => console.log('err', err))
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }

    if (this.state.redirectToReferrer || getToken()) {
      return <Redirect to={from} />
    }

    return (
      <div className="container section">
        <div className="row justify-content-center">
          <div className="card col-12 col-lg-6 mb-5 mt-5">
            <div className="card-body mb-4">
              <div className="text-center">
                <svg className="icon-md mt-2" viewBox="0 0 490.2 490.2">
                  <g>
                    <path
                      style={{ fill: 'var(--secondary)' }}
                      d="M266.2,88.6V9.9c0-5.5-4.4-9.9-9.9-9.9c-5.5,0-9.9,4.4-9.9,9.9v78.8c0,5.5,4.4,9.9,9.9,9.9C261.8,98.5,266.2,94.1,266.2,88.6z"
                    />
                    <path
                      style={{ fill: 'var(--secondary)' }}
                      d="M181.8,120.7c2.5,0,5.1-1,7-2.9c3.9-3.9,3.9-10.1,0-14l-55.7-55.7c-3.9-3.9-10.1-3.9-14,0s-3.9,10.1,0,14l55.7,55.7C176.7,119.7,179.3,120.7,181.8,120.7z"
                    />
                    <path
                      style={{ fill: 'var(--secondary)' }}
                      d="M420,177h-78.8c-5.5,0-9.9,4.4-9.9,9.9s4.4,9.9,9.9,9.9H420c5.5,0,9.9-4.4,9.9-9.9S425.5,177,420,177z"
                    />
                    <path
                      style={{ fill: 'var(--secondary)' }}
                      d="M82.6,186.9c0,5.5,4.4,9.9,9.9,9.9h78.8c5.5,0,9.9-4.4,9.9-9.9s-4.4-9.9-9.9-9.9H92.5C87.1,177,82.6,181.5,82.6,186.9z"
                    />
                    <path
                      style={{ fill: 'var(--secondary)' }}
                      d="M329.4,123.5l55.7-55.7c3.9-3.9,3.9-10.1,0-14s-10.1-3.9-14,0l-55.7,55.7c-3.9,3.9-3.9,10.1,0,14c1.9,1.9,4.5,2.9,7,2.9S327.5,125.4,329.4,123.5z"
                    />
                    <path
                      style={{ fill: '#b8cbd0' }}
                      d="M60.3,293.5V465c0,10.8,8.8,19.5,19.5,19.5h58.3c6.7,0,12.5-3.3,16.1-8.4c9.3,8.7,21.7,14.1,35.4,14.1h156.2c35,0,57.3-18.4,61.3-50.4l21-133.6c0.1-0.5,0.1-1,0.1-1.5c0-28.5-23.2-51.7-51.7-51.7h-78.1v-56.1c0-24.3-7.1-41.8-21.2-52.2c-22.3-16.3-52.8-7-54.1-6.6c-4.1,1.3-6.9,5.1-6.9,9.4v63.8c0,49.7-57.8,66.7-60.2,67.4c-1.2,0.3-2.4,0.9-3.3,1.7c-3.6-4-8.8-6.5-14.5-6.5H79.8C69,273.9,60.3,282.7,60.3,293.5z M157.7,298.1c1.2,0.1,2.4,0,3.6-0.3c3.1-0.9,74.7-21.6,74.7-86.4v-55.9c7.7-1.2,20.4-1.6,29.5,5.2c8.7,6.4,13.1,18.6,13.1,36.1v66c0,5.5,4.4,9.9,9.9,9.9h88c17.4,0,31.5,13.9,31.9,31.2l-20.9,132.9c0,0.1,0,0.2,0,0.3c-2.7,22-16.7,33.1-41.7,33.1H189.6c-17.6,0-31.9-14.3-31.9-31.9L157.7,298.1L157.7,298.1z M80.1,293.7h57.8v171H80.1V293.7z"
                    />
                  </g>
                </svg>
              </div>
              <h3 className="text-center mt-1 mb-4">Welcome back</h3>
              <Form
                schema={schema}
                uiSchema={uiSchema}
                showErrorList={false}
                onChange={log('changed')}
                onSubmit={this.login}
                onError={log('errors')}
              >
                <button type="submit" className="btn btn-secondary btn-lg btn-block">
                  Login
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  location: PropTypes.object,
}

export default Login
