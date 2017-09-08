
import ServiceBase from './ServiceBase';

import { USERS_URL, USER_URL } from '../config/URLS';

export default class UserService extends ServiceBase {
  constructor(...args) {
    super(args);
  }

  getUsers() {
    return super.get(USERS_URL);
  }

  getUser(id) {
    return super.get(USER_URL(id));
  }
}
