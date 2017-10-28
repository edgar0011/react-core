// @flow

import React, { Component } from 'react';

import { Link } from 'react-router';

import { Container, Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';

export default class MainLayout extends Component<any, any> {
  static contextTypes: {
    router: PropTypes.func.isRequired,
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
    const props = this.props;
    console.log('MainLayout render');
    console.log(this.context);
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
