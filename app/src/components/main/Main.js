/**
 * Created by edgar on 11/01/2017.
 */
import React from 'react';
import { Collapse, Button, Col, Row} from 'reactstrap';
import { connect } from 'react-redux';

import * as usersActions from '../../actions/usersActions';


@connect(store => {
  return {users: store.users};
}, {getUsers: usersActions.getUsers, getUser: usersActions.getUser})
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emphasized:false,
      iterations:0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({...this.state, emphasized:!this.state.emphasized, iterations:++this.state.iterations});

    this.props.getUsers();
  }


  render() {
    console.log('Main props');
    console.log(this.props);

    const title = 'Main';
    const color = this.state.emphasized ? 'danger' : 'primary';

    const users = this.props.users.users.map((user, index) => {
      return (
        <li class="list-group-item" key={'user' + index} onClick={() => this.props.getUser(user.id)}>
          <span class="float-left" >{user.name}</span>
        </li>
      )
    });

    console.log(users);

    const {usersLoading} = this.props.users;
    const {user} = this.props.users;
    const userMetadata = user && <div>
      <div><strong>{user.name}</strong></div>
      <div>{user.username}</div>
        <div><small>{user.email}</small></div>
        <address>
          <strong>{user.address.street}</strong><br/>
          {user.address.suite}<br/>
          {user.address.city}<br/>
          {user.address.zipcode}<br/>
          <abbr title="Phone">P:</abbr> {user.phone}
        </address>
    </div>;

    return (
      <Row>
        <Col>
          <Row>
            <Col><h3>{title}</h3></Col>
          </Row>
          <Row style={{height:'20px'}}></Row>
          <Row>
            <Col>loadingUsers: {usersLoading ? 'TRUE' : 'FALSE'}</Col>
          </Row>
          <Row style={{height:'20px'}}></Row>
          <Row>
            <Col>
              <Button color={color} onClick={this.handleClick}>MAIN clicked: {this.state.iterations}</Button>
            </Col>
          </Row>
          <Row style={{height:'20px'}}></Row>

          <Row>
            <Col class="col-sm-6">
              <Collapse isOpen={users && users.length>0}>

                  {users && users.length>0 && <ul class="list-group col-4">{users}</ul>}

              </Collapse>
            </Col>
            <Col class="col-sm-6">
              <Collapse isOpen={userMetadata}>
                {userMetadata}
              </Collapse>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}