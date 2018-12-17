// @flow

import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import Routes from '../routes'

export default class MainLayout extends Component<any, any> {
  static contextTypes: {
    router: Function,
  };

  constructor(props: any, context: any) {
    super(props);
    console.log('MainLayout');
    console.log(props);
    console.log(context);
    console.log(this.context);
  }

  render() {
    const title = 'React Core, boilerplate app';
    console.log('MainLayout render');
    console.log(this.context);
    return (
      <Container>
        <Row>
          <Col>
            <div class='jumbotron'>
              <h1>{title}</h1>
              <Row>
                <Col>
                  <ul class=' nav justify-content-center'>
                    <li>
                      <NavLink to='/main' activeClassName='active' class='nav-item nav-link'>Main</NavLink>
                    </li>
                    <li>
                      <NavLink to='/todo' activeClassName='active' class='nav-item nav-link'>Todo</NavLink>
                    </li>
                    <li>
                      <NavLink to='/tags' activeClassName='active' class='nav-item nav-link'>Tags</NavLink>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Routes location={this.props.location} />
          </Col>
        </Row>
      </Container>
    );
  }
}
