import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookResponse, BooksResults } from './types';
import { DATA_PATH } from './const';

// Define a service using a base URL and expected endpoints
export const libraryApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: DATA_PATH }),
  endpoints: (builder) => ({
    getBooksResult: builder.query<BookResponse, string>({
      query: (searchString) => searchString ? `?search=${searchString}` : '',
    }),
    getOneBook:builder.query<BooksResults, string>({
      query: (id) => `${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBooksResultQuery, useGetOneBookQuery } = libraryApi