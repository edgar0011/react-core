
import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import Collapse from 'react-collapse';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as usersActions from '../../actions/usersActions';


@connect((store) => {
  const { users } = store;
  return { users };
}, { getUsers: usersActions.getUsers, getUser: usersActions.getUser, removeUser: usersActions.removeUser })
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emphasized: false,
      iterations: 0,
      userDetailOpened: false,
    };
  }

  handleClick = () => {
    this.setState(
      { ...this.state, emphasized: !this.state.emphasized, iterations: ++this.state.iterations },
    );

    this.props.getUsers();
  }

  handleUserClick(user) {
    this.props.getUser(user.id).then((response) => {
      console.log('handleUserClick ', response);
      this.setState({ userDetailOpened: true });
    }, (error) => {
      console.log('handleUserClick error ', error);
    });
  }

  hideUserDetail() {
    this.setState({ userDetailOpened: false });
  }

  render() {
    const title = 'Main';
    const color = this.state.emphasized ? 'danger' : 'primary';

    const users = this.props.users.users.map((user, index) => {
      const ii = index + 100;
      return (
        <a
          href="#"
          role="menu"
          key={`user${ii}`}
          onClick={(event) => {
            event.preventDefault();
            this.handleUserClick(user);
          }}
        >
          <li class="list-group-item" >
            <span class="float-left" >{user.name}</span>
          </li>
        </a>
      );
    });

    const { usersLoading } = this.props.users;
    const { user } = this.props.users;
    const userMetadata = user && <div>
      <div><strong>{user.name}</strong></div>
      <div>{user.username}</div>
      <div><small>{user.email}</small></div>
      <address>
        <strong>{user.address.street}</strong><br />
        {user.address.suite}<br />
        {user.address.city}<br />
        {user.address.zipcode}<br />
        <abbr title="Phone">P:</abbr> {user.phone}
      </address>
    </div>;

    return (
      <Row>
        <Col>
          <Row>
            <Col><h3>{title}</h3></Col>
          </Row>
          <Row style={{ height: '20px' }} />
          <Row>
            <Col>loadingUsers: {usersLoading ? 'TRUE' : 'FALSE'}</Col>
          </Row>
          <Row style={{ height: '20px' }} />
          <Row>
            <Col>
              <Button
                color={color}
                onClick={this.handleClick}
              >
                MAIN clicked: {this.state.iterations}
              </Button>
            </Col>
          </Row>
          <Row style={{ height: '20px' }} />

          <Row>
            <Col class="col-sm-6">
              <Collapse
                isOpened={users && users.length > 0}
                springConfig={{ stiffness: 300, damping: 30 }}
              >
                {users && users.length > 0 && <ul class="list-group col-4">{users}</ul>}
              </Collapse>
            </Col>
            <Col class="col-sm-6">
              <Collapse
                isOpened={this.state.userDetailOpened}
                springConfig={{ stiffness: 300, damping: 40 }}
              >
                {userMetadata}
                <button
                  class="btn btn-info"
                  onClick={() => {
                    this.hideUserDetail();
                  }}
                >Close</button>
              </Collapse>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Main.propTypes = {
  getUsers: PropTypes.func,
  getUser: PropTypes.func,
  removeUser: PropTypes.func,
  user: PropTypes.object,
  users: PropTypes.array,
};
