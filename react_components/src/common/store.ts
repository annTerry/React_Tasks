import { configureStore } from '@reduxjs/toolkit';
import orderCardsSlice from '../slices/OrderCardsSlice';
import searchStringSlice from '../slices/searchStringSlice';
import formSlice from '../slices/formsDataSlice';
import { libraryApi } from './queries';

export const store = configureStore({
  reducer: {
    orderCards: orderCardsSlice,
    searchString: searchStringSlice,
    [libraryApi.reducerPath]: libraryApi.reducer,
    formData: formSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(libraryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
