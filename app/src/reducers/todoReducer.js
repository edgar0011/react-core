/**
 * Created by edgar on 11/01/2017.
 */
import { ADD_TODO, REMOVE_TODO } from '../config/CONSTANTS';

export default function todoReducer(state = {todos:[]}, action) {

  const type = action.type;

  if (type === ADD_TODO) {
    const id = Date.now();
    return {
      ...state,
      todos: [...state.todos, {todo: action.payload.text, id:id}]
    };
  }
  if (type === REMOVE_TODO) {

    let newTodods = [...state.todos];
    const id = action.payload;
    const index = newTodods.findIndex(todo => todo.id === id);

    if (index > -1) {
      newTodods.splice(index, 1);
    }
    return {
      ...state,
      todos: newTodods
    }
  }

  return state;

}