
import ServiceBase from './ServiceBase';

import {USERS_URL, USER_URL} from '../config/URLS';

export default class UserService extends ServiceBase {

  constructor(){
    super(arguments);
  }

  getUsers() {
    return super.get(USERS_URL);
  }

  getUser(id) {
    return super.get(USER_URL, {params:{id:id}});
  }



}