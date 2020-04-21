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
      return {};
    },
    setTickets(state, action) {
      const tempTickets = [...state];
      tempTickets.push(action.payload);

      return tempTickets;
    }
  }
});

export const { getTicket, clearTickets, setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
