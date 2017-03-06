/**
 * Created by edgar on 11/01/2017.
 */
import { USER_LOAD, USER_LOADED, USER_LOADING, USER_LOAD_FAILED } from '../config/CONSTANTS';
import { USERS_LOAD, USERS_LOADED, USERS_LOADING, USERS_LOAD_FAILED } from '../config/CONSTANTS';

export default function userReducer(state = {users:[], user:null}, action) {

  console.log("userReducer", state, action);

  const {type, payload} = action;
  switch (type) {
    //USER
    case USER_LOADING: {
      return {
        ...state, userLoading:true
      };
      break;
    }
    case USER_LOADED: {
        return {
          ...state, user:payload, userLoading:false
        };
      break;
    }
    case USER_LOAD_FAILED: {
      return {
        ...state, userErrors:payload, userLoading:false
      };
      break;
    }
    //USERS
    case USERS_LOADING: {
      return {
        ...state, usersLoading:true
      };
      break;
    }
    case USERS_LOADED: {
      const s =  {
        ...state, users:payload, usersLoading:false
      };
      return s;
      break;
    }
    case USERS_LOAD_FAILED: {
      return {
        ...state, usersErrors:payload, usersLoading:false
      };
      break;
    }
  }

  return state;

}