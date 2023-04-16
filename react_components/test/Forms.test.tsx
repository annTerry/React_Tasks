import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/common/store';
import { Provider } from 'react-redux';

describe('Router', () => {
  test('Click the form link', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByText('Order form')).toBeDefined();
    const user = userEvent.setup();
    const form = vi.spyOn(user, 'click');
    const formLink = screen.getByText(/Order form/i);

    await user.click(formLink);
    expect(form).toHaveBeenCalledTimes(1);
  });
});
