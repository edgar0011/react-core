/**
 * Created by edgar on 11/01/2017.
 */
import { USER_LOAD, USER_LOADED, USER_LOADING, USER_LOAD_FAILED, REMOVE_USER } from '../config/CONSTANTS';
import { USERS_LOAD, USERS_LOADED, USERS_LOADING, USERS_LOAD_FAILED } from '../config/CONSTANTS';

export default function userReducer(state = { users: [], user: null }, action) {
  const { type, payload } = action;
  switch (type) {
    // USER
    case USER_LOADING: {
      return {
        ...state, userLoading: true,
      };
    }
    case USER_LOADED: {
      return {
        ...state, user: payload, userLoading: false,
      };
    }
    case USER_LOAD_FAILED: {
      return {
        ...state, userErrors: payload, userLoading: false,
      };
    }
    // USERS
    case USERS_LOADING: {
      return {
        ...state, usersLoading: true
      };
    }
    case USERS_LOADED: {
      return {
        ...state, users: payload, usersLoading: false,
      };
    }
    case USERS_LOAD_FAILED: {
      return {
        ...state, usersErrors: payload, usersLoading: false,
      };
    }
    case REMOVE_USER: {
      return {
        ...state, user: null, userLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
