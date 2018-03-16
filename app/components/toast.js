import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, style } from 'react-toastify'

style({
  colorInfo: '#3498db',
  colorSuccess: '#18daa3',
  colorWarning: '#f1c40f',
  colorError: '#e74c3c',
  colorProgressDefault: '#18daa3',
})

const CloseButton = ({ closeToast }) => (
  <button className="close" onClick={closeToast}>
    &times;
  </button>
)

CloseButton.propTypes = {
  closeToast: PropTypes.func,
}

const Toast = () => (
  <div>
    <ToastContainer closeButton={<CloseButton />} className="toast" />
  </div>
)

export default Toast
