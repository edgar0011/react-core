import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/no-multi-comp:0 */
/* eslint react/prefer-stateless-function:0 */

export class User extends React.Component {
  // getChildContext serves as the initializer for our context values
  getChildContext() {
    const t = this.state ? this.state.clicked : null;
    return {
      favColor: '#f8c483',
      userName: `James Ipsum ${t}`,
    };
  }

  handleUser = () => {
    console.log('User handleUser', this);
    // debugger;
  }

  clickHandler = () => this.setState({ clicked: Date.now() })

  render() {
    const { ...props } = this.props
    return (
      <div>
        <button onClick={this.clickHandler}>CLICK ME</button>
        <UserCard
          handleUser={this.handleUser}
          {...props}

        />
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

export class UserCard extends React.Component {
  // Note that the UserCard component makes no use of context
  render() {
    const { handleUser } = this.props
    return (
      <div className="usercard" tabIndex="0" role='button' onClick={handleUser}>
        <UserIcon />
        <UserInfo />
      </div>
    );
  }
}
UserCard.propTypes = {
  handleUser: PropTypes.func
};

export class UserInfo extends React.Component {
  // We can make use of these context values...
  render() {
    return (
      <h2>USER: {this.context.userName}</h2>
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
