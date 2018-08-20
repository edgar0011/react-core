/**
 * Created by edgar on 11/01/2017.
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import todoReducer from '../reducers/todoReducer';
import userReducer from '../reducers/userReducer';
import tagReducer from '../reducers/tagReducer';

const combinedReducers = combineReducers({ todos: todoReducer, users: userReducer, tags: tagReducer });

const rootReducer = (state, action) => combinedReducers(state, action);

const composeEnhancers =
  /* global window */
  typeof window === 'object' &&
  /* eslint no-underscore-dangle: 0 */
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(store => next => (action) => {
    const state = store.getState();
    console.log('LOGGING STATE');
    console.log(state);
    console.log('LOGGING action');
    console.log(action);
    return next(action);
  }, thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, {}, enhancer);


store.subscribe(() => {
  console.log('Store, subscribe');
  console.log(arguments);
  console.log('store changed', store.getState());
});

export default store;
