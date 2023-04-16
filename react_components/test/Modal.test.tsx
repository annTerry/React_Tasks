import { describe, expect, test, afterAll, afterEach, beforeAll } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import ModalCard from '../src/components/ModalCard/ModalCard';
import React from 'react';
import { store } from '../src/common/store';
import { Provider } from 'react-redux';

const books = {
  id: 1399,
  title: 'Anna Karenina',
  authors: [{ name: 'Tolstoy, Leo, graf', birth_year: 1828, death_year: 1910 }],
  translators: [{ name: 'Garnett, Constance', birth_year: 1861, death_year: 1946 }],
  subjects: [],
  bookshelves: ['Best Books Ever Listings', 'Harvard Classics', 'Movie Books'],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: {
    'application/octet-stream': 'https://www.gutenberg.org/files/1399/1399-0.zip',
    'image/jpeg': 'https://www.gutenberg.org/cache/epub/1399/pg1399.cover.medium.jpg',
  },
  download_count: 7617,
};

export const restHandlers = [
  rest.get('https://gutendex.com/books/1399', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(books));
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('Modal show', () => {
  test('App rendering', async () => {
    function closeIt() {}
    render(
      <Provider store={store}>
        <ModalCard cardId="1399" onClose={closeIt} />
      </Provider>
    );
    expect(screen.getByText(/Load/i)).toBeDefined();
    await waitForElementToBeRemoved(() => screen.getByText(/Load/i));
    expect(screen.getAllByText(/Karenina/i).length).toBe(1);
  });
});
