import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-jsonschema-form'
import Widgets from 'Components/widgets'
import Template from 'Components/fieldTemplate'
import Api from 'Helpers/api'

const schema = {
  type: 'object',
  required: ['email', 'password', 'tradingName', 'employees', 'fullName', 'phone', 'namespace'],
  properties: {
    email: {
      type: 'string',
      title: 'Email',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
    tradingName: {
      type: 'string',
      title: 'Company',
    },
    employees: {
      type: 'string',
      enum: ['1-9', '10-49', '50-99', '100-249', '250-499', '500-999', '1000-4999', '5000+'],
      title: 'Number of employees',
    },
    fullName: {
      type: 'string',
      title: 'Full name',
    },
    phone: {
      type: 'string',
      title: 'Phone',
    },
    namespace: {
      type: 'string',
      title: 'Team name',
      description: 'This will be your access URL. my-team.thorr.io',
    },
  },
}

const uiSchema = {
  email: {
    'ui:placeholder': 'Email',
    'ui:widget': 'email',
  },
  password: {
    'ui:placeholder': 'Password',
    'ui:widget': 'password',
  },
}

// Testing logs
const log = type => console.log.bind(console, type)

class Register extends Component {
  state = {}

  register = form => {
    form.formData.firstName = form.formData.fullName
      .split(' ')
      .slice(0, -1)
      .join(' ')
    form.formData.lastName = form.formData.fullName
      .split(' ')
      .slice(-1)
      .join(' ')
    Api.register(form.formData).then(res => {
      console.log('res', res)
      this.props.history.push('/verify')
    })
  }

  render() {
    return (
      <div className="container section">
        <div className="row justify-content-center">
          <div className="card col-12 col-lg-6 mb-5 mt-5">
            <div className="card-body mb-4">
              <div className="text-center">
                <svg className="icon-md mt-2" viewBox="0 0 490.2 490.2">
                  <g>
                    <path
                      style={{ fill: '#b8cbd0' }}
                      d="M332.3,470.4H255v-22.5c0-5.5-4.4-9.9-9.9-9.9s-9.9,4.4-9.9,9.9v22.5h-77.3c-5.5,0-9.9,4.4-9.9,9.9s4.4,9.9,9.9,9.9h174.5c5.5,0,9.9-4.4,9.9-9.9C342.2,474.8,337.8,470.4,332.3,470.4z"
                    />
                    <path
                      style={{ fill: '#b8cbd0' }}
                      d="M230,277.1c-24.8,5.8-44,26.3-47.9,51.8h-39.6c4.1-15,17.8-26,34-26c5.5,0,9.9-4.4,9.9-9.9s-4.4-9.9-9.9-9.9c-27.2,0-49.9,19.8-54.3,45.8H44.1c-1-0.3-1.9-0.5-3-0.5c-5.5,0-9.9,4.4-9.9,9.9v54c0,12.5,10.2,22.7,22.7,22.7h382.4c12.5,0,22.7-10.2,22.7-22.7V129.1c0-12.5-10.2-22.7-22.7-22.7h-107c-5.5,0-9.9,4.4-9.9,9.9s4.4,9.9,9.9,9.9h107c1.6,0,2.9,1.3,2.9,2.9v263.3c0,1.6-1.3,2.9-2.9,2.9H53.9c-1.6,0-2.9-1.3-2.9-2.9v-43.6h357.2c5.5,0,9.9-4.4,9.9-9.9s-4.4-9.9-9.9-9.9h-42.3c-4.4-26-27.1-45.8-54.3-45.8c-5.5,0-9.9,4.4-9.9,9.9s4.4,9.9,9.9,9.9c16.3,0,29.9,11,34,26h-39.4c-4.2-28.4-27.6-50.6-56.4-53.2C237.9,275.1,230,277.1,230,277.1z M244.2,295.3c20.5,0,37.6,14.4,41.9,33.6h-83.8C206.5,309.7,223.7,295.3,244.2,295.3z"
                    />
                    <path
                      style={{ fill: '#b8cbd0' }}
                      d="M171.2,116.3c0-5.5-4.4-9.9-9.9-9.9H53.9c-12.5,0-22.7,10.2-22.7,22.7v172.7c0,5.5,4.4,9.9,9.9,9.9s9.9-4.4,9.9-9.9V129.1c0-1.6,1.3-2.9,2.9-2.9h107.4C166.8,126.2,171.2,121.8,171.2,116.3z"
                    />
                    <path
                      style={{ fill: 'var(--secondary)' }}
                      d="M281.9,267c5.5,0,9.9-4.4,9.9-9.9V238h21.8c5.5,0,9.9-4.4,9.9-9.9v-19.7c0-6.7-1.9-13.3-5.5-19l-15.3-24.1c-1.5-2.3-2.2-5-2.2-7.7V78.5c0-12-4.3-23.6-12.2-32.7L251.7,3.4c-1.9-2.2-4.6-3.4-7.5-3.4l0,0c-2.9,0-5.6,1.3-7.5,3.5l-36.2,42.4c-7.7,9.1-12,20.6-12,32.5V157c0,3-0.9,5.8-2.6,8.2l-16.3,23.5c-4.2,6-6.4,13-6.4,20.3v19.1c0,5.5,4.4,9.9,9.9,9.9l18,0.1v19.1c0,5.5,4.4,9.9,9.9,9.9s9.9-4.4,9.9-9.9v-19.1l0.1-0.1c5.5,0,9.9-4.4,9.9-9.9s-4.4-9.9-9.9-9.9h-28V209c0-3.2,1-6.3,2.8-9l16.3-23.5c4-5.8,6.1-12.5,6.1-19.6V78.4c0-7.2,2.6-14.2,7.2-19.6l29-33.7l29,33.6c4.7,5.5,7.3,12.5,7.3,19.7v79.1c0,6.5,1.8,12.8,5.3,18.3l15.3,24.1c1.6,2.5,2.4,5.4,2.4,8.4v9.8h-26.6c-5.5,0-9.9,4.4-9.9,9.9c0,3.6,1.9,6.7,4.8,8.4v20.7C272,262.6,276.5,267,281.9,267z"
                    />
                    <path
                      style={{ fill: '#b8cbd0' }}
                      d="M233.3,235.1v42.7c0,5.3,4,10,9.3,10.3c5.7,0.3,10.5-4.2,10.5-9.9v-43.1c0-5.5-4.4-9.9-9.9-9.9l0,0C237.7,225.2,233.3,229.6,233.3,235.1z"
                    />
                  </g>
                </svg>
              </div>
              <h3 className="text-center mt-2 mb-4">Let&rsquo;s get started</h3>
              <Form
                schema={schema}
                uiSchema={uiSchema}
                widgets={Widgets}
                FieldTemplate={Template}
                showErrorList={false}
                onChange={log('changed')}
                onSubmit={this.register}
                onError={log('errors')}
              >
                <button type="submit" className="btn btn-secondary btn-lg btn-block">
                  Register
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  history: PropTypes.object,
}

export default Register
