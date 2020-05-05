import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const usersCountReducer = createSlice({
  name: 'usersCount',
  initialState,
  reducers: {
    setUsersCount(state, action) {
      return action.payload;
    }
  }
});

export const { setUsersCount } = usersCountReducer.actions;

export default usersCountReducer.reducer;
