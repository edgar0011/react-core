
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Main from "./components/main/Main";
import Todo from "./components/todo/Todo";
import Tagger from "./components/tag/Tagger";

const Routes = ({ location }) => (
  <div>
    {['/', ''].includes(location.pathname)  && <Redirect strict from='/' to='/main' />}
    <Route path='/main' exact component={Main} />
    <Route path='/todo' exact component={Todo} />
    <Route path='/tags' exact component={Tagger} />
  </div>
)

export default Routes
