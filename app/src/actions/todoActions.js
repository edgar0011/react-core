
// @flow

import { ADD_TODO, REMOVE_TODO } from '../config/CONSTANTS';

export function addTodo(text:string, data:any) {
  return {
    type: ADD_TODO,
    payload: { text, ...data },
  };
}

export function removeTodo(id:number) {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
}
