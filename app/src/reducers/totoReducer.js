/**
 * Created by edgar on 11/01/2017.
 */
import { ADD_TODO } from '../config/CONSTANTS';
import { REMOVE_TODO } from '../config/CONSTANTS';

export default function todoReducer(state = {}, action) {

  console.log("todoReducer");
  console.log(state);
  console.log(action);

  const type = action.type;

  if (type === ADD_TODO) {
    state = state.concat();
    state.push({todo: action.payload.text});
  }
  if (type === REMOVE_TODO) {
    state = state.concat();
    state.splice(action.payload, 1);
  }

  return state;

}