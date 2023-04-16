import { describe, expect, test, afterAll, afterEach, beforeAll } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../src/App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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

describe('MainApp', () => {
  test('App rendering', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeDefined();
    await waitForElementToBeRemoved(() => screen.getByText(/Load/i));
    expect(header.textContent).toContain('Welcome to our Store!');
  });
});
