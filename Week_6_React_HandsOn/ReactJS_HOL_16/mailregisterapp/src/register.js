import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    const errors = {};
    const { name, email, password } = this.state;

    if (name.length < 5) {
      errors.name = 'Name must be at least 5 characters long';
    }
    if (!email.includes('@') || !email.includes('.')) {
      errors.email = 'Email must contain @ and .';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      alert('Registration successful!');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register</h2>

        <label>Name:</label>
        <br />
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <br />

        <label>Email:</label>
        <br />
        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <br />

        <label>Password:</label>
        <br />
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <br />

        <button type="submit">Register</button>
      </form>
    );
  }
}

export default Register;
