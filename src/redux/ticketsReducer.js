import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const ticketsSlice = createSlice({
  name: 'Tickets',
  initialState,
  reducers: {
    getTicket(state) {
      return state;
    },
    clearTickets() {
      return [];
    },
    addTicket(state, action) {
      const tempTickets = [...state];
      tempTickets.push(action.payload);

      return tempTickets;
    }
  }
});

export const { getTicket, clearTickets, addTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;
