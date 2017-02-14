
import { ADD_TODO } from '../config/CONSTANTS';

export default function todoReducer(state = {}, action) {

  console.log("todoReducer");
  console.log(state);
  console.log(action);

  const type = action.type;

  if (type === ADD_TODO) {
    state = state.concat();
    state.push({todo: action.payload.text});
  }

  return state;

}