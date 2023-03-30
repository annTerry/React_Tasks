import OrderForms from '../components/formsComponents/orderForm';
import AllOrderCards from '../components/formsComponents/orderAllCards';
import React, { useState } from 'react';
import { Order } from 'common/types';

export default function Forms() {
  const [orders, setOrders] = useState<Order[]>([]);

  const createCard = (order: Order) => {
    const oldOrder = orders;
    oldOrder.push(order);
    setOrders(oldOrder);
  };

  return (
    <section>
      <h1>Order new book</h1>
      <OrderForms saveOrder={createCard} />
      <AllOrderCards orders={orders} />
    </section>
  );
}
