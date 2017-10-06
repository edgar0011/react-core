/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/cosmo/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles/bootstrap-override.scss';
import './styles/main.scss';

import MainLayout from './components/MainLayout';
import Todo from './components/todo/Todo';
import Main from './components/main/Main';
import store from './stores/store';

/* global document */
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="main" />
      <Route path="/" component={MainLayout}>
        <Route path="main" component={Main} />
        <Route path="todo" component={Todo} />
      </Route>
    </Router>
  </Provider>
  , app,
);
