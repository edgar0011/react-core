/**
 * Created by edgar on 11/01/2017.
 */
import { USER_LOADED, USER_LOADING, USER_LOAD_FAILED } from '../config/CONSTANTS';
import { USERS_LOADED, USERS_LOADING, USERS_LOAD_FAILED } from '../config/CONSTANTS';
import UserService from '../dataApi/UserService';

const userService = new UserService();

export function getUsers() {
  return function(dispatch) {
    dispatch(usersLoading());

    return userService.getUsers()
      .then(response => {
        dispatch(usersLoaded(response.data));
      }, errors => {
        dispatch(usersLoadFailed(errors));
      });
  }
}

export function usersLoading() {
  return  {
    type: USERS_LOADING
  }
}

export function usersLoaded(users) {
  return  {
    type: USERS_LOADED,
    payload: users
  }
}

export function usersLoadFailed(errors) {
  return  {
    type: USERS_LOAD_FAILED,
    payload: errors
  }
}

export function getUser(id) {
  return {
    type:REMOVE_TODO,
    payload:id
  }
}