
// @flow

import { ADD_TAG, REMOVE_TAG, GET_TAGS_LOADING, GET_TAGS_LOADED, GET_TAGS_LOAD_FAILED } from '../config/CONSTANTS';

import TagService from '../dataApi/TagService';
import type { TagServiceType } from '../dataApi/TagService';

const tagService:TagServiceType = new TagService();

export function addTag(text:string, data:any) {
  return {
    type: ADD_TAG,
    payload: { text, ...data },
  };
}

export function removeTag(id:number) {
  return {
    type: REMOVE_TAG,
    payload: id,
  };
}

export function tagsLoading() {
  return {
    type: GET_TAGS_LOADING,
  };
}

export function tagsLoaded(tags:Array<string>) {
  return {
    type: GET_TAGS_LOADED,
    payload: tags,
  };
}

export function tagsLoadFailed(errors:any) {
  return {
    type: GET_TAGS_LOAD_FAILED,
    payload: errors,
  };
}

export function getTags(words:number = 1, num:number = 200) {
  return (dispatch:Function) => {
    dispatch(tagsLoading());

    return tagService.getTags(words, num)
      .then((response) => {
        dispatch(tagsLoaded(response.data.result));
        return response;
      }, (errors) => {
        dispatch(tagsLoadFailed(errors));
        return errors;
      });
  };
}
