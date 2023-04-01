import { Order } from 'common/types';
import React from 'react';
import './orderCard.css';

export default function OrderCard(orderData: Order) {
  return (
    <div className="one-order-card">
      <h3>Order:</h3>
      <div className="order-property">
        <span>Name:</span>
        <span>{orderData.name}</span>
      </div>
      <div className="order-property">
        <span>Date:</span>
        <span>{orderData.date}</span>
      </div>
      <div className="order-property">
        <span>Quantity:</span>
        <span>{orderData.quantity}</span>
      </div>
      <div className="order-property">
        <span>Presents:</span>
        <span>{orderData.presents.join(', ')}</span>
      </div>
      <div className="order-property">
        <span>Send by:</span>
        <span>{orderData.send}</span>
      </div>
      <div className="order-property">
        <span>Send to:</span>
        <span>
          {orderData.address}, {orderData.country}
        </span>
      </div>
      <div className="img-wrapper">
        <img src={orderData.invoice} />
      </div>
    </div>
  );
}
