import { Order } from 'common/types';
import React from 'react';

export default class OrderCard extends React.Component<Order> {
  constructor(props: Order) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Order:</h3>
        <div>{this.props.name}</div>
        <div>{this.props.quantity}</div>
        <div>{this.props.presents.join(', ')}</div>
        <div>{this.props.send}</div>
        <div>{this.props.address}</div>
        <div>{this.props.country}</div>
        <img src={this.props.invoice} />
      </div>
    );
  }
}
