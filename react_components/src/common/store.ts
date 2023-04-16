import { configureStore } from '@reduxjs/toolkit';
import orderCardsSlice from '../slices/OrderCardsSlice';

export const store = configureStore({
  reducer: {
    orderCards: orderCardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
