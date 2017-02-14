/**
 * Created by edgar on 12/02/2017.
 */
import React from 'react';
import { Button } from 'reactstrap';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emphasized:false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({emphasized:!this.state.emphasized});
  }

  render() {
    const title = 'Todo';

    console.log('Todo: this.props');
    console.log(this.props);
    console.log('Todo: this.state');
    console.log(this.state);

    return (
      <div>
        <h3>{title}</h3>
        <Button color="primary" onClick={this.handleClick}>TODO</Button>
      </div>
    )
  }
}