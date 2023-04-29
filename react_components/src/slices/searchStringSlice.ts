import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../common/store';
import { Simple } from '../common/types';

const initialState: Simple = {
  value: '',
};

export const searchStringSlice = createSlice({
  name: 'searchString',
  initialState,
  reducers: {
    setNewString: (state, action: PayloadAction<Simple>) => {
      const value = action.payload.value;
      state.value = value;
    },
  },
});

export const { setNewString } = searchStringSlice.actions;

export const searchStringValue = (state: RootState) => state.searchString;

export default searchStringSlice.reducer;
