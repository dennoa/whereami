import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete'
import Numeral from 'numeral'
import Pikaday from 'pikaday'
import Moment from 'moment'
import { rangeSpec } from 'react-jsonschema-form/lib/utils'

// Checkbox
const Checkbox = props => (
  <div className={`checkbox ${props.disabled || props.readonly ? 'disabled' : ''}`}>
    <input
      type="checkbox"
      id={props.id}
      checked={typeof props.value === 'undefined' ? false : props.value}
      required={props.required}
      disabled={props.disabled || props.readonly}
      onChange={event => props.onChange(event.target.checked)}
    />
  </div>
)

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
}

// Google address autocomplete
const Address = props => (
  <Autocomplete
    required={props.required}
    className="form-control"
    value={props.value == null ? '' : props.value}
    onChange={event => props.onChange(event.target.value)}
    onPlaceSelected={place => props.onChange(place.formatted_address)}
    types={['address']}
    componentRestrictions={{ country: 'AU' }}
  />
)

Address.propTypes = {
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

// Price slider
const Range = props => {
  const { schema, value, registry: { widgets: { BaseInput } } } = props
  return (
    <div className="range-slider">
      <span className="range-min">{Numeral(schema.minimum).format('($0a)')}</span>
      <span className="range-max">{Numeral(schema.maximum).format('($0a)')}</span>
      <BaseInput type="range" {...props} {...rangeSpec(schema)} />
      <span className="range-view h4">{Numeral(value).format('($0.0a)')}</span>
    </div>
  )
}

Range.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.number.isRequired,
  registry: PropTypes.object,
}

// Datepicker
class DatePicker extends Component {
  componentDidMount() {
    const { options } = this.props
    const pickerIgnored = new Pikaday({
      field: document.getElementById(this.props.id),
      firstDay: 0,
      minDate: new Date(options.minDate),
      maxDate: new Date(options.maxDate),
      onSelect: () => this.props.onChange(Moment(pickerIgnored.toString()).format()),
    })
  }
  render() {
    const { id, required, value } = this.props
    return (
      <div className="mask-container">
        <input
          id={id}
          value={value == null ? '' : value}
          required={required}
          type="text"
          className="input-date"
          autoComplete="off"
        />
        <span className="input-mask">{value == null ? '' : Moment(value).format('DD/MM/YYYY')}</span>
      </div>
    )
  }
}

DatePicker.propTypes = {
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  value: PropTypes.string,
}

export default {
  thorCheckbox: Checkbox,
  thorAddress: Address,
  thorRange: Range,
  thorDate: DatePicker,
}
