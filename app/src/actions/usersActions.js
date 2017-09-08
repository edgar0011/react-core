/**
 * Created by edgar on 11/01/2017.
 */
import {
  USERS_LOADED, USERS_LOADING, USERS_LOAD_FAILED,
  USER_LOADED, USER_LOADING, USER_LOAD_FAILED,
} from '../config/CONSTANTS';

import UserService from '../dataApi/UserService';

const userService = new UserService();

export function usersLoading() {
  return {
    type: USERS_LOADING,
  };
}

export function usersLoaded(users) {
  return {
    type: USERS_LOADED,
    payload: users,
  };
}

export function usersLoadFailed(errors) {
  return {
    type: USERS_LOAD_FAILED,
    payload: errors,
  };
}

export function getUsers() {
  return function (dispatch) {
    dispatch(usersLoading());

    return userService.getUsers()
      .then((response) => {
        dispatch(usersLoaded(response.data));
      }, (errors) => {
        dispatch(usersLoadFailed(errors));
      });
  };
}

export function userLoading() {
  return {
    type: USER_LOADING,
  };
}

export function userLoaded(user) {
  return {
    type: USER_LOADED,
    payload: user,
  };
}

export function userLoadFailed(errors) {
  return {
    type: USER_LOAD_FAILED,
    payload: errors,
  };
}

export function getUser(id) {
  return function (dispatch) {
    dispatch(userLoading());

    return userService.getUser(id)
      .then((response) => {
        dispatch(userLoaded(response.data));
      }, (errors) => {
        dispatch(userLoadFailed(errors));
      });
  };
}
