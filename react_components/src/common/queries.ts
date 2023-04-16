import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookResponse, BooksResults } from './types';
import { DATA_PATH } from './const';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
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

export const { useGetBooksResultQuery, useGetOneBookQuery } = libraryApi