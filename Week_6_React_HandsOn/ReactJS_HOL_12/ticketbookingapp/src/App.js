import React, { Component } from 'react';
import Guest from './Guest';
import User from './User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div>
            <User />
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Guest />
            <button onClick={this.handleLogin}>Login</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
