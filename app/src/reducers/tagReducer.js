import shortid from 'shortid';

import { ADD_TAG, REMOVE_TAG, GET_TAGS_LOADING, GET_TAGS_LOADED, GET_TAGS_LOAD_FAILED } from '../config/CONSTANTS';

export default function tagReducer(state = { tags: [], tagsLoading: false }, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TAG: {
      const newTag = { value: action.payload, id: shortid.generate() };
      return {
        ...state, tags: [...state.tags, newTag],
      };
    }

    case GET_TAGS_LOADED: {
      const newTags = action.payload.map(tag => ({ value: tag, id: shortid.generate() }));
      return {
        ...state, tags: [...state.tags, ...newTags], tagsLoading: false,
      };
    }

    case GET_TAGS_LOAD_FAILED: {
      return {
        ...state, tagsErrors: payload, tagsLoading: false,
      };
    }

    case GET_TAGS_LOADING: {
      return {
        ...state, tagsLoading: true,
      };
    }

    case REMOVE_TAG: {
      const newTags = state.tags.filter(tag => tag !== action.payload);
      return {
        ...state, tags: newTags,
      };
    }

    default: {
      return state;
    }
  }
}
