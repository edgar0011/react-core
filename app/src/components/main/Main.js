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
    const title = 'Main';
    const color = this.state.emphasized ? 'danger' : 'primary';

    console.log(this.props.users);
    const users = this.props.users.users.map((user, index) => {
      return (
        <li class="list-group-item" key={'user' + index}>
          <span class="float-left" >{user.name}</span>
        </li>
      )
    });

    console.log(users);

    const {usersLoading} = this.props.users;

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
            <Col>
              <Collapse isOpen={users && users.length>0}>

                  {users && users.length>0 && <ul class="list-group col-4">{users}</ul>}

              </Collapse>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}