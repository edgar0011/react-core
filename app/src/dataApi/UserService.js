// @flow

import ServiceBase from './ServiceBase';

import { USERS_URL, USER_URL } from '../config/URLS';

export default class UserService extends ServiceBase {
  constructor(...args:any) {
    super(args);
  }

  getUsers() {
    return super.get(USERS_URL);
  }

  getUser(id:Number) {
    return super.get(USER_URL(id));
  }
}

export type UserServiceType = {
  getUsers(): Promise<any>,
  getUser(id:Number): Promise<any>,
}
