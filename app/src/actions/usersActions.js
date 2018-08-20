
// @flow

import {
  USERS_LOADED, USERS_LOADING, USERS_LOAD_FAILED,
  USER_LOADED, USER_LOADING, USER_LOAD_FAILED, REMOVE_USER,
} from '../config/CONSTANTS';

import UserService from '../dataApi/UserService';
import type { UserServiceType } from '../dataApi/UserService';

const userService:UserServiceType = new UserService();

export function usersLoading() {
  return {
    type: USERS_LOADING,
  };
}

export function usersLoaded(users: Array<any>) {
  return {
    type: USERS_LOADED,
    payload: users,
  };
}

export function usersLoadFailed(errors: any) {
  return {
    type: USERS_LOAD_FAILED,
    payload: errors,
  };
}

export function getUsers() {
  return async (dispatch: Function) => {
    dispatch(usersLoading());

    try {
      const response = await userService.getUsers()
      dispatch(usersLoaded(response.data));
      return response;
    } catch (error) {
      dispatch(usersLoadFailed(error));
      return error;
    }
  };
}

export function userLoading() {
  return {
    type: USER_LOADING,
  };
}

export function userLoaded(user: any) {
  return {
    type: USER_LOADED,
    payload: user,
  };
}

export function userLoadFailed(errors: any) {
  return {
    type: USER_LOAD_FAILED,
    payload: errors,
  };
}

export function getUser(id: any) {
  return async (dispatch: Function) => {
    dispatch(userLoading());

    try {
      const response = await userService.getUser(id)
      dispatch(userLoaded(response.data));
      return response;
    } catch (error) {
      dispatch(userLoadFailed(error));
      return error;
    }
  };
}

export function removeUser(id: any) {
  return {
    type: REMOVE_USER,
    payload: id,
  };
}
