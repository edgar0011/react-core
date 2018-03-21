/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/cosmo/bootstrap.css';
import 'font-awesome/scss/font-awesome.scss';
import './styles/bootstrap-override.scss';
import './styles/main.scss';

import MainLayout from './components/MainLayout';
import Todo from './components/todo/Todo';
import Main from './components/main/Main';
import Tagger from './components/tag/Tagger';
import store from './stores/store';

/* global document */
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Redirect from="/" to="main" />
      <Route path="/" component={MainLayout}>
        <Route path="main" exact component={Main} />
        <Route path="todo" exact component={Todo} />
        <Route path="tags" exact component={Tagger} />
      </Route>
    </Router>
  </Provider>
  , app,
);
