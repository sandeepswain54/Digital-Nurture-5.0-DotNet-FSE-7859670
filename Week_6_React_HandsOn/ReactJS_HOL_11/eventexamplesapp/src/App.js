import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
    this.sayHello();
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  sayHello = () => {
    console.log('Hello, counter incremented!');
  };

  sayWelcome = (name) => {
    alert('Welcome, ' + name + '!');
  };

  handleSyntheticClick = (e) => {
    e.preventDefault();
    alert('I was clicked');
  };

  render() {
    return (
      <div>
        <h2>Counter: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <br /><br />
        <button onClick={() => this.sayWelcome('welcome')}>Say Welcome</button>
        <br /><br />
        <button onClick={this.handleSyntheticClick}>OnPress</button>
      </div>
    );
  }
}

class CurrencyConvertor extends Component {
  constructor(props) {
    super(props);
    this.state = { rupees: '', euro: null };
    this.rupeeRef = React.createRef();
  }

  handleSubmit = () => {
    const rupees = parseFloat(this.rupeeRef.current.value);
    const conversionRate = 0.011;
    const euro = (rupees * conversionRate).toFixed(2);
    this.setState({ euro });
  };

  render() {
    return (
      <div>
        <h2>Currency Convertor (INR to EUR)</h2>
        <input type="number" ref={this.rupeeRef} placeholder="Enter amount in INR" />
        <button onClick={this.handleSubmit}>Convert</button>
        {this.state.euro !== null && <p>Euro: {this.state.euro}</p>}
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Counter />
      <hr />
      <CurrencyConvertor />
    </div>
  );
}

export default App;
