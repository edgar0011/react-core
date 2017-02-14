import {createStore, combineReducers} from 'redux';
import todoReducer from '../reducers/totoReducer';
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({todos:todoReducer, user:userReducer});


class Store {

  constructor(){

  }

}

const store = createStore(rootReducer, {todos:[], user:null}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//const store = createStore(rootReducer);

store.subscribe(()=>{
  console.log(arguments);
  console.log('store changed', store.getState());
});

window.store = store;


export default store;