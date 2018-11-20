
import { ADD_TODO, REMOVE_TODO } from '../config/CONSTANTS';

export default function todoReducer(state = { todos: [] }, action) {
  const type = action.type;

  if (type === ADD_TODO) {
    const id = action.id || Date.now();
    return {
      ...state,
      todos: [...state.todos, { todo: action.payload.text, id }],
    };
  }
  if (type === REMOVE_TODO) {
    const newTodods = [...state.todos];
    const id = action.payload;
    const index = newTodods.findIndex(todo => todo.id === id);

    if (index > -1) {
      newTodods.splice(index, 1);
    }
    return {
      ...state,
      todos: newTodods,
    };
  }

  return state;
}
