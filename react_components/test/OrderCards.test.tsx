import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import AllOrderCards from '../src/components/formsComponents/AllOrderCards';
import React from 'react';
import { store } from '../src/common/store';
import { Provider } from 'react-redux';
import { addNewCard } from '../src/slices/OrderCardsSlice';
import { Order } from '../src/common/types';

describe('All order card render test', () => {
  test('Order cards renders', () => {
    const card: Order = {
      name: 'Name',
      quantity: 2,
      date: '11-12-2020',
      country: 'USA',
      send: 'post',
      presents: ['wrapper'],
      invoice: 'invoice',
      address: 'Address',
    };
    store.dispatch(addNewCard(card));
    render(
      <Provider store={store}>
        <AllOrderCards />
      </Provider>
    );
    expect(screen.getByText(/11-12-2020/i)).toBeDefined();
  });
});
