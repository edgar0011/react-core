// @flow

import React, { Component } from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';

export default class BasicInput extends Component<any, any> {
  static propTypes = {
    onChangeHandler: PropTypes.func,
    type: PropTypes.string,
    pattern: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    formatters: PropTypes.array,
    changeBounce: PropTypes.number,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { value: this.props.value || '', errors: {} };
  }

  componentWillMount() {
    const bounce = this.props.changeBounce === undefined ? 300 : this.props.changeBounce;
    this.propsOnChangeHandler = _.debounce(this.doPropsOnChangeHandler, bounce);
  }

  componentWillReceiveProps(nextProps: any) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setValue(value);
    }
  }

  onChangeHandler = (event: Object) => {
    let { value } = event.target;
    if (this.props.formatters) {
      this.props.formatters.forEach((formatter) => {
        value = formatter(value, this.state.value);
      });
    }
    this.setValue(value);
    this.propsOnChangeHandler(value);
  };


  setValue(value: any) {
    this.setState({ value });
  }

  reset() {
    this.setValue('');
  }

  doPropsOnChangeHandler(value: any) {
    this.props.onChangeHandler(value);
  }

  propsOnChangeHandler: Function;

  render() {
    const { value } = this.state;
    const { type, className, pattern } = this.props;
    const { dto } = this.context;
    console.log('BasicInput:');
    console.log(dto);
    console.log(this.context);

    return (
      <input type={type || 'text'} class={className} onChange={this.onChangeHandler} value={value} pattern={pattern} />
    );
  }
}
