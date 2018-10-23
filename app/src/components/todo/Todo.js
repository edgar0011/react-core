
// @flow

import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dom } from 'flow';
import { memoize } from 'lodash';

import BasicInput from '../ui/BasicInput';
import * as addTodoActions from '../../actions/todoActions';
import TODOS from '../../styles/basic';

import TodoCard from './TodoCard';

/* eslint no-unused-vars:0 */
import fbService from '../../dataApi/FB';

@connect((store) => {
  const { todos } = store;
  return { todos };
}, { addTodo: addTodoActions.addTodo, removeTodo: addTodoActions.removeTodo })
export default class Todo extends Component<any, any> {
  static propTypes = {
    todos: PropTypes.object,
    addTodo: PropTypes.func,
    removeTodo: PropTypes.func,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      emphasized: false,
      inputPlaceHolder: 'Karel 1',
    };

    this.formatters = [(value, prevValue) => {
      let newValue = value;
      if (isNaN(Number(newValue))) {
        newValue = prevValue;
      }
      if (isNaN(Number(newValue)) || Number(newValue) < 0) {
        newValue = prevValue;
      }

      const val2Str = parseInt(newValue.toString(), 10);
      const val2strNornalized = isNaN(val2Str) ? '' : val2Str;
      return newValue ? val2strNornalized : '';
    }];

    this.memoizedHandleRemoveTodo = memoize(this.handleRemoveTodo)

    fbService();
  }

  onChangeHandler = () => {
    this.setState({ textBasicInputValue: this.textBasicInput.state.value });
  };

  handleClick = () => {
    this.setState({ emphasized: !this.state.emphasized });
  };

  handleAddTodo = () => {
    this.props.addTodo(this.textBasicInput.state.value);

    this.textBasicInput.reset();
    this.setState({ textBasicInputValue: null, inputPlaceHolder: 'Hello' });
  };

  handleRemoveTodo = (index: number) => () => {
    const { todos } = this.props.todos;
    this.props.removeTodo(todos[index].id);
  };


  refHandlertextBasicInput = (input: dom.HTMLInputElement) => {
    this.textBasicInput = input
  }
  formatters: any;
  textBasicInput: dom.HTMLInputElement;
  memoizedHandleRemoveTodo: Function

  render() {
    const title = 'Todo';
    const todoStyle = TODOS.TODO.TEXT;
    const todos = this.props.todos && this.props.todos.todos ? this.props.todos.todos : [];
    const todosNodes = todos.map((todo, index) => (
      <li class="list-group-item" key={`todo${todo.id}`}>
        <span class="float-left" style={todoStyle}>{todo.todo}</span>
        <span class=" float-right">
          <span
            tabIndex={index}
            role="menuItem"
            class="fa fa-remove"
            style={{ color: '#666', fontSize: '120%', cursor: 'pointer' }}
            onClick={this.memoizedHandleRemoveTodo(index)}
          />
        </span>
      </li>
    ));

    return (
      <Row>
        <Col>
          <Row>
            <h3>{title}</h3>
          </Row>
          <Row>
            <Col class="col-sm-6">
              <div>
                <BasicInput
                  ref={this.refHandlertextBasicInput}
                  onChangeHandler={this.onChangeHandler}
                  changeBounce={100}
                  value={this.state.inputPlaceHolder}
                  formatters={this.formatters}
                />
                <TodoCard />
              </div>
              <Button color="primary" onClick={this.handleAddTodo} disabled={!this.state.textBasicInputValue}>ADD TODO</Button>
            </Col>
          </Row>
          <Row>
            <Col class="col-sm-6">
              {todosNodes && todosNodes.length > 0 && <ul class="list-group">{todosNodes}</ul>}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
