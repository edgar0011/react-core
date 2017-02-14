/**
 * Created by edgar on 14/02/2017.
 */
import React from 'react';
import lodash from 'lodash';

export default class BasicInput extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.state = {value:this.props.value, errors:{}};
  }

  componentWillMount() {
    const bounce = this.props.changeBounce == undefined ? 300 : this.props.changeBounce;
    console.log('bounce');
    console.log(bounce);
    this._onChangeHandler = lodash.debounce(this._onChangeHandler, bounce);
  }

  onChangeHandler(event) {
    this.setState({value:event.target.value});
    this._onChangeHandler(event.target.value);
  }

  _onChangeHandler(value){
    this.props.onChangeHandler(this.state);
  }

  reset() {
    this.setState({value : ""});
  }

  render(){
    return (
      <input type={this.props.type || 'text'} onChange={this.onChangeHandler} value={this.state.value} />
    )
  }


}