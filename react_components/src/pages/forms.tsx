import OrderForms from '../components/formsComponents/orderForm';
import AllOrderCards from '../components/formsComponents/orderAllCards';
import React from 'react';

export default class Forms extends React.Component {
  render() {
    return (
      <section>
        <h1>Order new book</h1>
        <OrderForms />
        <AllOrderCards />
      </section>
    );
  }
}
