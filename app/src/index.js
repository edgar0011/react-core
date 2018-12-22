/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, BrowserRouter, Route } from 'react-router-dom';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import Raven from 'raven-js';

import 'babel-polyfill';

import { ConnectedRouter } from 'react-router-redux'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/cosmo/bootstrap.css';
import 'font-awesome/scss/font-awesome.scss';
import './styles/bootstrap-override.scss';
import './styles/main.scss';

import MainLayout from './components/MainLayout';

import store from './stores/store';

const history = createHistory({ basename: '/' })

Raven
  .config('https://dc9efafe120a415dbfbc2beb4b23691a@sentry.io/1270389')
  .install();

/* global document */
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path='/' component={MainLayout} />
      </div>
    </ConnectedRouter>
  </Provider>
  , app,
);
