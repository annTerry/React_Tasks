import OrderForms from '../components/formsComponents/orderForm';
import AllOrderCards from '../components/formsComponents/orderAllCards';
import React from 'react';
import { Order, StateOrder } from 'common/types';

export default class Forms extends React.Component {
  state: StateOrder = { orders: [] };
  constructor(props: PropertyDecorator) {
    super(props);
    this.createCard = this.createCard.bind(this);
  }

  createCard(order: Order) {
    const oldState = this.state.orders;
    oldState.push(order);
    this.setState({ orders: oldState });
  }

  render() {
    return (
      <section>
        <h1>Order new book</h1>
        <OrderForms saveOrder={this.createCard} />
        <AllOrderCards orders={this.state.orders} />
      </section>
    );
  }
}
