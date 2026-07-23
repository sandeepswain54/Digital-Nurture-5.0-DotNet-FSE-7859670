import React, { Component } from 'react';

class ComplaintRegister extends Component {
  constructor(props) {
    super(props);
    this.state = { employeeName: '', complaint: '' };
  }

  handleNameChange = (e) => {
    this.setState({ employeeName: e.target.value });
  };

  handleComplaintChange = (e) => {
    this.setState({ complaint: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const referenceNumber = 'REF-' + Math.floor(100000 + Math.random() * 900000);
    alert(
      'Complaint registered for ' + this.state.employeeName +
      '.\nReference Number: ' + referenceNumber
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Complaint Register</h2>
        <label>Employee Name:</label>
        <br />
        <input
          type="text"
          value={this.state.employeeName}
          onChange={this.handleNameChange}
        />
        <br /><br />
        <label>Complaint:</label>
        <br />
        <textarea
          value={this.state.complaint}
          onChange={this.handleComplaintChange}
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default ComplaintRegister;
