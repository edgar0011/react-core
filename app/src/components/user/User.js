import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/no-multi-comp:0 */
/* eslint react/prefer-stateless-function:0 */

export class User extends React.Component {
  // getChildContext serves as the initializer for our context values
  getChildContext() {
    return {
      favColor: '#f8c483',
      userName: 'James Ipsum',
    };
  }

  render() {
    return (
      <div>
        <Usercard />
      </div>
    );
  }
}

// childContextTypes is defined on the context-provider, giving the
// context values their corresponding type and passing them down the tree
User.childContextTypes = {
  favColor: PropTypes.string,
  userName: PropTypes.string,
};

export class Usercard extends React.Component {
  // Note that the Usercard component makes no use of context
  render() {
    return (
      <div className="usercard">
        <UserIcon />
        <UserInfo />
      </div>
    );
  }
}

export class UserInfo extends React.Component {
  // We can make use of these context values...
  render() {
    return (
      <h2>{this.context.userName}</h2>
    );
  }
}

// By defining corresponding contextTypes on child components down the tree that wish to access them
UserInfo.contextTypes = {
  userName: PropTypes.string,
};

export class UserIcon extends React.Component {
  // Same as above
  render() {
    return (
      <div
        className="circle"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '100px',
          backgroundColor: this.context.favColor,
        }}
      />
    );
  }
}

// But accessing favColor instead.
UserIcon.contextTypes = {
  favColor: PropTypes.string,
};
