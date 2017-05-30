/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from  'react-dom';
import MainLayout from './components/MainLayout';
import Todo from './components/todo/Todo';
import Main from './components/main/Main';


import store from './stores/store';
import { Provider } from 'react-redux';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/Cosmo/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import { Router, Route, IndexRoute, browserHistory, hashHistory as history} from 'react-router';

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Main} ></IndexRoute>
        <Route path="todo" component={Todo}></Route>
      </Route>
    </Router>
  </Provider>
  , app
);
