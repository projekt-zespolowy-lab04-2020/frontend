import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-undef
const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false
};

const authContextSlice = createSlice({
  name: 'AuthContext',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        ...action.payload
      };
    }
  }
});

export const { setCurrentUser } = authContextSlice.actions;
export default authContextSlice.reducer;
