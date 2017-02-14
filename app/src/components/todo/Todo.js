/**
 * Created by edgar on 12/02/2017.
 */
import React from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';

import BasicInput from '../BasicInput';

import * as addTodoActions from '../../actions/todoActions';

@connect((store)=> {
  return {
    todos: store.todos
  }
})
export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emphasized:false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  handleClick(event) {
    this.setState({emphasized:!this.state.emphasized});
  }

  handleAddTodo() {
    this.props.dispatch(addTodoActions.addTodo(this.textBasicInput.state.value));
    this.textBasicInput.reset();

  }
  handleRemoveTodo(index) {
    this.props.dispatch(addTodoActions.removeTodo(index));
  }


  onChangeHandler(basicInputState) {
      console.log('basicInputState' );
      console.log(basicInputState);
      console.log('textBasicInput');
      console.log(this.textBasicInput);
  }

  render() {
    const title = 'Todo';

    console.log('Todo: this.props');
    console.log(this.props);
    console.log('Todo: this.state');
    console.log(this.state);
    const todos = this.props.todos.map((todo, index) => {
      return (<li key={'todo' + index}>{todo.todo}<span class="glyphicon glyphicon-remove" onClick={this.handleRemoveTodo.bind(this, index)}>REMOVE</span></li>)
    });
    return (
      <div>
        <h3>{title}</h3>
        <div><BasicInput ref={(input) => { this.textBasicInput = input; }} onChangeHandler={this.onChangeHandler} changeBounce="100" value="Karel 1"/></div>
        <Button color="primary" onClick={this.handleAddTodo}>ADD TODO</Button>
        <Button color="primary" onClick={this.handleRemoveTodo}>REMOVE TODO</Button>
        <ul>{todos}</ul>
      </div>
    )
  }
}