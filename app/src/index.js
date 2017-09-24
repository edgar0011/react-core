/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory as history } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/cosmo/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import MainLayout from './components/MainLayout';
import Todo from './components/todo/Todo';
import Main from './components/main/Main';
import store from './stores/store';

/* global document */
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Main} />
        <Route path="todo" component={Todo} />
      </Route>
    </Router>
  </Provider>
  , app,
);
