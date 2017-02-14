/**
 * Created by edgar on 11/01/2017.
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

    this.formatters = [(value, prevValue) => {
      if (isNaN(Number(value))) {
        value = prevValue;
      }
      if (isNaN(Number(value)) || Number(value) < 0) {
        value = prevValue;
      }

      return !!value ? parseInt(value.toString()) : '';
    }]
  }

  handleClick(event) {
    this.setState({emphasized:!this.state.emphasized});
  }

  handleAddTodo() {
    this.props.dispatch(addTodoActions.addTodo(this.textBasicInput.state.value));
    this.textBasicInput.reset();
    this.setState({textBasicInputValue: null });

  }
  handleRemoveTodo(index) {
    this.props.dispatch(addTodoActions.removeTodo(index));
  }


  onChangeHandler(basicInputState) {
      console.log('basicInputState' );
      console.log(basicInputState);
      console.log('textBasicInput');
      console.log(this.textBasicInput);
      this.setState({textBasicInputValue: this.textBasicInput.state.value });
  }

  render() {
    const title = 'Todo';

    console.log('Todo: this.props');
    console.log(this.props);
    console.log('Todo: this.state');
    console.log(this.state);

    const todos = this.props.todos.map((todo, index) => {
      return (<li key={'todo' + index}>{todo.todo}<span class="fa fa-remove" style={{color:'#FFF', fontSize: '200%', cursor:'pointer'}} onClick={this.handleRemoveTodo.bind(this, index)}></span></li>)
    });

    const disabledAdd = this.textBasicInput ? !this.textBasicInput.state.value : false;
    if (this.textBasicInput) {
      console.log('this.textBasicInput.state.value');
      console.log(this.textBasicInput.state.value);
    }

    return (
      <div>
        <h3>{title}</h3>
        <div><BasicInput ref={(input) => { this.textBasicInput = input; }} onChangeHandler={this.onChangeHandler} changeBounce="100" value="Karel 1" formattersX={this.formatters}/></div>
        <Button color="primary" onClick={this.handleAddTodo} disabled={!this.state.textBasicInputValue}>ADD TODO</Button>
        <Button color="primary" onClick={this.handleRemoveTodo}>REMOVE TODO</Button>
        <ul>{todos}</ul>
      </div>
    )
  }
}