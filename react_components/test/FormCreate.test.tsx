import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrderForms from '../src/components/formsComponents/OrderForm';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { store } from '../src/common/store';
import { Provider } from 'react-redux';
import {
  setName,
  setAddress,
  setCountry,
  setDate,
  setPresents,
  setQuantity,
  setSend,
} from '../src/slices/formsDataSlice';

describe('Forms render test', () => {
  test('Forms data renders', async () => {
    store.dispatch(setName('Name'));
    store.dispatch(setAddress('Address'));
    store.dispatch(setCountry('USA'));
    store.dispatch(setDate('11-12-2020'));
    store.dispatch(setPresents(['wrapper']));
    store.dispatch(setQuantity(4));
    store.dispatch(setSend('Post'));
    render(
      <Provider store={store}>
        <OrderForms />
      </Provider>
    );
    expect(screen.getByDisplayValue(/Name/i)).toBeDefined();
    const user = userEvent.setup();
    const submit = vi.spyOn(user, 'click');
    const submitButton = screen.getByText(/Submit/i);

    await user.click(submitButton);
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
