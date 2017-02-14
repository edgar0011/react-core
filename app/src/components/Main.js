/**
 * Created by edgar on 12/02/2017.
 */
import React from 'react';
import { Button } from 'reactstrap';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emphasized:false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({...this.state, emphasized:!this.state.emphasized});
    console.log(this.state);
  }


  render() {
    const title = 'Main';
    const color = this.state.emphasized ? 'danger' : 'primary';

    console.log('Main: this.props');
    console.log(this.props);
    console.log('Main: this.state');
    console.log(this.state);

    console.log("color: " + color);
    return (
      <div>
        <h3>{title}</h3>
        <Button color={color} onClick={this.handleClick}>MAIN</Button>
      </div>
    )
  }
}