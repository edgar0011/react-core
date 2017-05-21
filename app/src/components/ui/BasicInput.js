import React from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';

export default class BasicInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {value: this.props.value || '', errors: {}}
  }

  componentWillMount () {
    const bounce = this.props.changeBounce === undefined ? 300 : this.props.changeBounce
    this._propsOnChangeHandler = _.debounce(this._propsOnChangeHandler, bounce)
  }

  componentWillReceiveProps (nextProps) {
    let {value} = nextProps
    if (value !== this.props.value) {
      this._setValue(value)
    }
  }

  onChangeHandler = (event) => {
    let {value} = event.target
    if (this.props.formatters) {
      this.props.formatters.forEach((formatter) => {
        value = formatter(value, this.state.value)
      })
    }
    this._setValue(value)
    this._propsOnChangeHandler(value)
  }

  _propsOnChangeHandler (value) {
    this.props.onChangeHandler(value)
  }

  reset () {
    this._setValue('')
  }

  _setValue (value) {
    this.setState({value})
  }

  render () {
    const {value} = this.state
    const {props} = this

    return (
      <input type={props.type || 'text'} class={props.className} onChange={this.onChangeHandler} value={value} pattern={props.pattern} />
    )
  }

}

BasicInput.propTypes = {
  onChangeHandler: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.any
}
