import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../common/store';
import { Order } from '../common/types';

const initialState: Order = {
  name: '',
  quantity: 0,
  presents: [],
  send: '',
  country: '',
  address: '',
  invoice: '',
  date: '',
};

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    setPresents: (state, action: PayloadAction<string[]>) => {
      state.presents = action.payload;
    },
    setSend: (state, action: PayloadAction<string>) => {
      state.send = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    resetData: (state) => {
      state.name = '';
      state.quantity = 0;
      state.presents = [];
      state.address = '';
      state.date = '';
      state.country = '';
      state.send = '';
    },
  },
});

export const {
  resetData,
  setName,
  setAddress,
  setCountry,
  setDate,
  setPresents,
  setQuantity,
  setSend,
} = formSlice.actions;

export const allOrders = (state: RootState) => state.formData;

export default formSlice.reducer;
