// @flow

import React, { Component } from 'react';

import { Link } from 'react-router';

import { Container, Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';

export default class MainLayout extends Component<any, void> {
  constructor(props:any, context:any) {
    super(props);
    /* eslint no-debugger:0 */
    debugger;
    console.log('MainLayout');
    console.log(props);
    console.log(context);
  }

  render() {
    const title = 'React Core, boilerplate app';
    const props = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <div class="jumbotron">
              <h1>{title}</h1>
              <Row>
                <Col>
                  <ul class=" nav justify-content-center">
                    <li>
                      <Link to="main" activeClassName="active" class="nav-item nav-link">Main</Link>
                    </li>
                    <li>
                      <Link to="todo" activeClassName="active" class="nav-item nav-link">Todo</Link>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    );
  }
}

MainLayout.contextTypes = {
  router: PropTypes.object.isRequired,
};
