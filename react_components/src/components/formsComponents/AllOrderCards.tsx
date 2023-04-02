import { StateOrder } from 'common/types';
import React from 'react';
import OrderCard from './orderCard';
import './AllOrderCards.css';

export default function AllOrderCards({ orders }: StateOrder) {
  const orderCards = orders.map((order, index) => (
    <OrderCard
      key={order.name + '_order' + '_' + index}
      name={order.name}
      quantity={order.quantity}
      country={order.country}
      send={order.send}
      presents={order.presents}
      invoice={order.invoice}
      address={order.address}
      date={order.date}
    />
  ));
  return (
    <div className="orders__wrapper">
      <h2>Orders:</h2>
      <div className="all-orders-card__wrapper">{orderCards}</div>
    </div>
  );
}
