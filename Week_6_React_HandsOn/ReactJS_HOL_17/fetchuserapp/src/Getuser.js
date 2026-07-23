import React, { Component } from 'react';

class Getuser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data.results[0] });
      })
      .catch(error => {
        console.log('Error fetching user:', error);
      });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h2>Random User</h2>
        <p>Title: {user.name.title}</p>
        <p>First Name: {user.name.first}</p>
        <img src={user.picture.large} alt="User" />
      </div>
    );
  }
}

export default Getuser;
