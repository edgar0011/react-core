// @flow

import {
  USERS_LOADED, USERS_LOADING, USERS_LOAD_FAILED,
  USER_LOADED, USER_LOADING, USER_LOAD_FAILED, REMOVE_USER
} from '../config/CONSTANTS';

import UserService from '../dataApi/UserService';

const userService = new UserService();

export function usersLoading() {
  return {
    type: USERS_LOADING,
  };
}

export function usersLoaded(users:Array<any>) {
  return {
    type: USERS_LOADED,
    payload: users,
  };
}

export function usersLoadFailed(errors:any) {
  return {
    type: USERS_LOAD_FAILED,
    payload: errors,
  };
}

export function getUsers() {
  return (dispatch:Function) => {
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

export function userLoaded(user:any) {
  return {
    type: USER_LOADED,
    payload: user,
  };
}

export function userLoadFailed(errors:any) {
  return {
    type: USER_LOAD_FAILED,
    payload: errors,
  };
}

export function getUser(id:any) {
  return (dispatch:Function) => {
    dispatch(userLoading());

    return userService.getUser(id)
      .then((response) => {
        dispatch(userLoaded(response.data));
      }, (errors) => {
        dispatch(userLoadFailed(errors));
      });
  };
}

export function removeUser(id:any) {
  return {
    type: REMOVE_USER,
    payload: id,
  };
}
