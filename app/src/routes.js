
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './styles/transitions.scss'

import Main from "./components/main/Main";
import Todo from "./components/todo/Todo";
import Tagger from "./components/tag/Tagger";


const Routes = ({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      classNames='slide'
      timeout={250}
    >
      <Switch location={location}>
        {['/', ''].includes(location.pathname)  && <Redirect strict to='/main' />}
        <Route path='/main' exact component={Main} />
        <Route path='/todo' exact component={Todo} />
        <Route path='/tags' exact component={Tagger} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

export default Routes
