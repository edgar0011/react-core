import React from 'react';
import ReactDOM from  'react-dom';
import Layout from './components/Layout';
import Todo from './components/todo/Todo';
import Main from './components/Main';

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

import { Router, Route, IndexRoute, browserHistory} from 'react-router';

const app = document.getElementById('app');
ReactDOM.render(<Router history={browserHistory}>

    <Route path="/" component={Layout}>
      <IndexRoute component={Main} ></IndexRoute>
      <Route path="todo" component={Todo}></Route>
    </Route>

  </Router>, app);
