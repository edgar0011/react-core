
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';

import { UserCard } from '../user/User';

export default class TodoCard extends Component<any, any> {
  // eslint-disable-next-line
  constructor(props: any, context: any) {
    super(props, context);
    console.log('TodoCard');
    console.log(props);
    console.log(context);
  }

  getChildContext() {
    return {
      favColor: '#003366',
      userName: 'Carl von Baumax',
    };
  }

  render() {
    return (
      <Row>
        <Col>
          <UserCard />
        </Col>
      </Row>
    );
  }
}

TodoCard.childContextTypes = {
  favColor: PropTypes.string,
  userName: PropTypes.string,
};

