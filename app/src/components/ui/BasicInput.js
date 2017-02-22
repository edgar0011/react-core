/**
 * Created by edgar on 11/01/2017.
 */
import React from 'react';
import lodash from 'lodash';

export default class BasicInput extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.state = {value:this.props.value || "", errors:{}};
  }

  componentWillMount() {
    const bounce = this.props.changeBounce == undefined ? 300 : this.props.changeBounce;
    this._onChangeHandler = lodash.debounce(this._onChangeHandler, bounce);
  }

  componentWillReceiveProps(nextProps) {
    let {value} = nextProps;
    if (value !== this.props.value) {
      this._setValue(value);
    }
  }

  onChangeHandler(event) {
    let value = event.target.value;
    if (this.props.formatters) {
      this.props.formatters.forEach((formatter)=>{
        value = formatter(value, this.state.value);
      });
    }
    this._setValue(value);
    this._onChangeHandler();
  }

  _onChangeHandler(){
    this.props.onChangeHandler(this.state);
  }

  reset() {
    this._setValue("");
  }

  _setValue(value) {
    this.setState({value});
  }

  render(){

    let {value} = this.state;

    return (
      <input type={this.props.type || 'text'} onChange={this.onChangeHandler} value={value} pattern={this.props.pattern} />
    )
  }

}

BasicInput.propTypes = {
  onChangeHandler: React.PropTypes.func,
  type: React.PropTypes.string,
  value: React.PropTypes.string
};