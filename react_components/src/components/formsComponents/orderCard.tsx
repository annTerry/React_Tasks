import { Order } from 'common/types';
import React from 'react';
import './orderCard.css';

export default class OrderCard extends React.Component<Order> {
  constructor(props: Order) {
    super(props);
  }
  render() {
    return (
      <div className="one-order-card">
        <h3>Order:</h3>
        <div className="order-property">
          <span>Name:</span>
          <span>{this.props.name}</span>
        </div>
        <div className="order-property">
          <span>Date:</span>
          <span>{this.props.date}</span>
        </div>
        <div className="order-property">
          <span>Quantity:</span>
          <span>{this.props.quantity}</span>
        </div>
        <div className="order-property">
          <span>Presents:</span>
          <span>{this.props.presents.join(', ')}</span>
        </div>
        <div className="order-property">
          <span>Send by:</span>
          <span>{this.props.send}</span>
        </div>
        <div className="order-property">
          <span>Send to:</span>
          <span>
            {this.props.address}, {this.props.country}
          </span>
        </div>
        <div className="img-wrapper">
          <img src={this.props.invoice} />
        </div>
      </div>
    );
  }
}
