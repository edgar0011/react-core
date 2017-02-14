/**
 * Created by edgar on 11/01/2017.
 */
import { ADD_TODO } from '../config/CONSTANTS';
import { REMOVE_TODO } from '../config/CONSTANTS';

export function addTodo(text, data) {
  return {
    type:ADD_TODO,
    payload:{text, ...data}
  }
}


export function removeTodo(id) {
  return {
    type:REMOVE_TODO,
    payload:id
  }
}