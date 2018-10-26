
// @flow

import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import Collapse from 'react-collapse';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { memoize } from 'lodash';

import Raven from 'raven-js';

import { User } from '../user/User';
import * as usersActions from '../../actions/usersActions';

import ItemsList from '../../_libViews/itemsList/ItemsList'

const data = [
  { id: 0,
    items: [{ id: 0, size: 3, bolder: true, content: 'Datum 1' },
      { id: 1, size: 3, demi: false, content: 'Datum 2' },
      { id: 2, size: 3, demi: true, content: 'Datum 3' },
      { id: 3, size: 3, demi: false, content: 'Datum 4' }] },
  { id: 1,
    items: [{ id: 0, size: 4, bolder: true, content: 'Name 1' },
      { id: 1, size: 4, demi: false, content: 'Name 2' },
      { id: 2, size: 4, demi: true, content: 'Name 3' },
      { id: 3, size: 4, demi: false, content: 'Name 4' }] },
  { id: 2,
    items: [{ id: 0, size: 4, bolder: true, content: 'Whatever 1' },
      { id: 1, size: 4, demi: false, content: 'Whatever 2' },
      { id: 2, size: 4, demi: true, content: 'Whatever 3' },
      { id: 3, size: 4, demi: false, content: 'Whatever 4' }] },
  { id: 3,
    items: [{ id: 0, size: 4, bolder: true, content: 'Longer data 1' },
      { id: 1, size: 4, demi: false, content: 'Longer data 2' },
      { id: 2, size: 4, demi: true, content: 'Longer data 3' },
      { id: 3, size: 4, demi: true, content: 'Longer data 4' },
      { id: 4, size: 4, demi: true, content: 'Longer data 5' }
    ] }
]
@connect((store) => {
  console.log('main store.dispatch', store.dispatch);
  console.log('main store', store);
  const { users } = store;
  return { users };
}, { getUsers: usersActions.getUsers,
  getUser: usersActions.getUser,
  removeUser: usersActions.removeUser })
export default class Main extends Component<any, any> {
  static propTypes = {
    getUsers: PropTypes.func,
    getUser: PropTypes.func,
    removeUser: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.object,
  };
  static contextTypes = {
    store: PropTypes.object
  };
  constructor(props: any, context: any) {
    super(props, context);
    console.log('Main');
    console.log(props);
    console.log(context);
    this.state = {
      emphasized: false,
      iterations: 0,
      userDetailOpened: false,
    };

    this.memoizedHandleUserClick = memoize(this.handleUserClick);
    this.memoizedHandleRemoveUser = memoize(this.handleRemoveUser);
  }

  memoizedHandleUserClick: Function
  memoizedHandleRemoveUser: Function

  handleClick = () => {
    const state = this.state;
    this.setState({ emphasized: !state.emphasized, iterations: ++state.iterations });
    /* this.setState(
      { ...state,
        emphasized: state ? !state.emphasized : false,
        iterations: state ? ++state.iterations : 0,
      },
    ); */

    /* this.setState( state => ({
      emphasized: state ? !state.emphasized : false,
      iterations: state ? ++state.iterations : 0,
    })); */

    try {
      throw new Error('ReactCore sample error, handleClick');
    } catch(error) {
      Raven.captureException(error)
    }

    this.props.getUsers();
  };

  handleUserClick = (userId: number) => (event: SyntheticEvent<any>) => {
    event.preventDefault();
    this.props.getUser(userId).then((response) => {
      console.log('handleUserClick ', response);
      const state = this.state;
      this.setState({ ...state, userDetailOpened: true });
    }, (error) => {
      console.log('handleUserClick error ', error);
    });
  }

  hideUserDetail = (): void => {
    this.setState({ userDetailOpened: false });
    throw new Error('ReactCore sample error, handleUserClick');
  }

  handleRemoveUser = (id: number) => (event: SyntheticEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.users.user && this.props.users.user.id === id) {
      this.hideUserDetail();
    }
    this.props.removeUser(id);
  };

  render() {
    const title = 'Main';
    const color = this.state.emphasized ? 'danger' : 'primary';

    const users = this.props.users.users.map((user, index) => {
      const ii = index + 100;
      return (
        /* eslint jsx-a11y/href-no-hash:0 */
        <li
          class='list-group-item'
          key={`user${ii}`}
        >
          <a
            href='#'
            role='menu'
            onClick={this.memoizedHandleUserClick(user.id)}
          >
            <span class='float-left' >
              {user.name}
              <br />
              <small>{user.email}</small>
            </span>
            <span class='float-right'>
              <Button
                color='danger'
                onClick={this.memoizedHandleRemoveUser(user.id)}
              >
                Remove
              </Button>
            </span>
          </a>
        </li>
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
        <abbr title='Phone'>P:</abbr> {user.phone}
      </address>
    </div>;

    return (
      <div>
        <Row>
          <ItemsList data={data} />
        </Row>
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
          <Col class='col-sm-6'>
            <Collapse
              isOpened={users && users.length > 0}
              springConfig={{ stiffness: 300, damping: 30 }}
            >
              {users && users.length > 0 && <ul class='list-group'>{users}</ul>}
            </Collapse>
          </Col>
          <Col class='col-sm-6'>
            <Collapse
              isOpened={this.state.userDetailOpened}
              springConfig={{ stiffness: 300, damping: 40 }}
            >
              {userMetadata}
              <button
                class='btn btn-info'
                onClick={this.hideUserDetail}
              >Close</button>
            </Collapse>
          </Col>
        </Row>
        <Row>
          <Col>
            <User />
          </Col>
        </Row>
      </div>
    );
  }
}
