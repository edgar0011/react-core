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

  onChangeHandler(event) {
    let value = event.target.value;
    if (this.props.formatters) {
      this.props.formatters.forEach((formatter)=>{
        value = formatter(value, this.state.value);
      });
    }
    this.setState({value});
    this._onChangeHandler();
  }

  _onChangeHandler(){
    this.props.onChangeHandler(this.state);
  }

  reset() {
    this.setState({value : ""});
  }

  render(){
    return (
      <input type={this.props.type || 'text'} onChange={this.onChangeHandler} value={this.state.value} pattern={this.props.pattern} />
    )
  }


}