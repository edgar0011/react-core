import React from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';

export default class BasicInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value || '', errors: {} };
  }

  componentWillMount() {
    const bounce = this.props.changeBounce === undefined ? 300 : this.props.changeBounce;
    this.propsOnChangeHandler = _.debounce(this.propsOnChangeHandler, bounce);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setValue(value);
    }
  }

  onChangeHandler = (event) => {
    let { value } = event.target;
    if (this.props.formatters) {
      this.props.formatters.forEach((formatter) => {
        value = formatter(value, this.state.value);
      });
    }
    this.setValue(value);
    this.propsOnChangeHandler(value);
  };


  setValue(value) {
    this.setState({ value });
  }

  reset() {
    this.setValue('');
  }

  propsOnChangeHandler(value) {
    this.props.onChangeHandler(value);
  }

  render() {
    const { value } = this.state;
    const { type, className, pattern } = this.props;

    return (
      <input type={type || 'text'} class={className} onChange={this.onChangeHandler} value={value} pattern={pattern} />
    );
  }
}

BasicInput.propTypes = {
  onChangeHandler: PropTypes.func,
  type: PropTypes.string,
  pattern: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  formatters: PropTypes.array,
  changeBounce: PropTypes.number,
};
