import { configureStore } from '@reduxjs/toolkit';
import orderCardsSlice from '../slices/OrderCardsSlice';
import searchStringSlice from '../slices/searchStringSlice';
import { libraryApi } from './queries';

export const store = configureStore({
  reducer: {
    orderCards: orderCardsSlice,
    searchString: searchStringSlice,
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(libraryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
