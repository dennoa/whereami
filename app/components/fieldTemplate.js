import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'

// Custom layout
const FieldTemplate = props => {
  const { id, classNames, label, help, required, description, errors, children, displayLabel } = props
  return (
    <div className={classNames}>
      {displayLabel && (
        <span>
          <label htmlFor={id}>
            {label}
            {required ? <span className="required">*</span> : null}
            {help.props.help ? (
              <Tooltip title={help.props.help} arrow="true" size="small" className="help-tooltip">
                ?
              </Tooltip>
            ) : null}
          </label>
          {description}
        </span>
      )}
      {children}
      {/* {!displayLabel && description} // disabled as form description displays twice, // TODO: re-enable and fix */}
      {errors}
    </div>
  )
}

FieldTemplate.propTypes = {
  id: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.object.isRequired,
  required: PropTypes.bool,
  description: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  displayLabel: PropTypes.bool,
}

export default FieldTemplate
