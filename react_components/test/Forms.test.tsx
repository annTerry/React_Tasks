import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Router', () => {
  test('Click the form link', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByText('Order form')).toBeDefined();
    const user = userEvent.setup();
    const form = vi.spyOn(user, 'click');
    const formLink = screen.getByText(/Order form/i);

    await user.click(formLink);
    expect(form).toHaveBeenCalledTimes(1);
  });
});
