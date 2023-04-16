import OrderForms from '../components/formsComponents/OrderForm';
import AllOrderCards from '../components/formsComponents/AllOrderCards';
import React from 'react';
import { Order, StateOrder } from 'common/types';

export default function Forms() {
  return (
    <section>
      <h1>Order new book</h1>
      <OrderForms />
      <AllOrderCards />
    </section>
  );
}
