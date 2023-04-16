import React from 'react';
import OrderCard from './orderCard';
import './AllOrderCards.css';
import type { RootState } from '../../common/store';
import { useSelector } from 'react-redux';

export default function AllOrderCards() {
  const orders = useSelector((state: RootState) => state.orderCards.orders);
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
