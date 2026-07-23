import React, { Component } from 'react';
import Cart from './Cart';

class OnlineShopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [
        new Cart('Laptop', 55000),
        new Cart('Mobile Phone', 20000),
        new Cart('Headphones', 1500),
        new Cart('Keyboard', 800),
        new Cart('Monitor', 12000)
      ]
    };
  }

  render() {
    return (
      <div>
        <h2>Online Shopping Cart</h2>
        <ul>
          {this.state.cartItems.map((item, index) => (
            <li key={index}>
              {item.itemname} - Rs. {item.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OnlineShopping;
