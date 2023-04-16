import { describe, expect, test, vi, afterAll, afterEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { store } from '../src/common/store';
import { Provider } from 'react-redux';

const books = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export const restHandlers = [
  rest.get('https://gutendex.com/books/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(books));
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('Router', () => {
  test('Click the about router link', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByText('About')).toBeDefined();
    const user = userEvent.setup();
    const about = vi.spyOn(user, 'click');
    const aboutLink = screen.getByText(/About/i);

    await user.click(aboutLink);
    expect(about).toHaveBeenCalledTimes(1);
  });
  test('Go to 404 page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const wrongRoute = '/wrong/page';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[wrongRoute]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/404. Not Found/i)).toBeDefined();
  });
});
