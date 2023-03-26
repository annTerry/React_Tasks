import { StateOrder } from 'common/types';
import React from 'react';
import OrderCard from './orderCard';

export default class AllOrderCards extends React.Component<StateOrder> {
  constructor(props: StateOrder) {
    super(props);
  }
  render() {
    const orders = this.props.orders.map((order, index) => (
      <OrderCard
        key={order.name + '_order' + '_' + index}
        name={order.name}
        quantity={order.quantity}
        country={order.country}
        send={order.send}
        presents={order.presents}
        invoice={order.invoice}
        address={order.address}
      />
    ));
    return (
      <div>
        <h2>Orders:</h2>
        {orders}
      </div>
    );
  }
}
