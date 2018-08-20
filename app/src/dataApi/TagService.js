
// @flow

import ServiceBase from './ServiceBase';

import { createTagUrl } from '../config/URLS';

export default class TagService extends ServiceBase {
  constructor(...args: any) {
    super(args);
  }

  getTags(words: ?number, num: ?number) {
    return super.get(createTagUrl(words, num));
  }

  addTag(text: string) {
    return super.get(createTagUrl(text));
  }

  removeTag(id: number) {
    return super.delete(createTagUrl(id));
  }
}

export type TagServiceType = {
  getTags(words: ?number, num: ?number): Promise<any>,
  addTag(text: string): Promise<any>,
  removeTag(id: number): Promise<any>,
}

