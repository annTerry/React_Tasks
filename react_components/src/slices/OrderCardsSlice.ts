import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../common/store';
import { StateOrder, Order } from '../common/types';

const initialState: StateOrder = {
  orders: [],
};

export const orderCardsSlice = createSlice({
  name: 'orderCards',
  initialState,
  reducers: {
    addNewCard: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addNewCard } = orderCardsSlice.actions;

export const allOrders = (state: RootState) => state.orderCards;

export default orderCardsSlice.reducer;
