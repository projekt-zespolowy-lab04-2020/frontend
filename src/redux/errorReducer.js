import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const errorSlice = createSlice({
  name: 'Error',
  initialState,
  reducers: {
    getErrors(state, action) {
      return action.payload;
    },
    clearErrors() {
      return {};
    }
  }
});

export const { getErrors, clearErrors } = errorSlice.actions;

export default errorSlice.reducer;
