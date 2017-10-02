/**
 * Created by edgar on 19/02/2017.
 */

import axios from 'axios';

export default class ServiceBase {
  constructor(config = null) {
    if (config) {
      this.instance = axios.create(config);
    }
    // TODO maybe
    /* var instance = axios.create({
      baseURL: 'https://some-domain.com/api/',
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
    }); */
  }

  call(config) {
    return axios(config);
  }

  get(url, config = null) {
    return axios.get(url, config);
  }

  post(url, data, config = null) {
    return axios.post(url, data, config);
  }
}

