/**
 * Created by edgar on 11/01/2017.
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import todoReducer from '../reducers/todoReducer';
import userReducer from '../reducers/userReducer';


const rootReducer = combineReducers({ todos: todoReducer, users: userReducer });
let window;
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, {}, enhancer);


store.subscribe(() => {
  console.log('Store, subscribe');
  console.log(arguments);
  console.log('store changed', store.getState());
});

export default store;
