import React from 'react'
import PropTypes from 'prop-types'

const Modal = props => (
  <div
    className="modal fade"
    id={props.id}
    tabIndex="-1"
    role="dialog"
    aria-labelledby={`${props.id}Label`}
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">{props.children}</div>
    </div>
  </div>
)

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
}

export default Modal
