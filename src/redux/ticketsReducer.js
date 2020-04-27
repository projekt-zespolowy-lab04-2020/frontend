import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const ticketsSlice = createSlice({
  name: 'Tickets',
  initialState,
  reducers: {
    getTickets(state) {
      return state;
    },
    clearTickets() {
      return [];
    },
    addTicket(state, action) {
      const tempTickets = [...state];
      tempTickets.push(action.payload);

      return tempTickets;
    },
    changeTicketInPlace(state, action) {
      const { tempId, patchedTicket } = action.payload;
      const tempState = [...state];

      const index = state.findIndex(obj => {
        const { ticket } = obj;
        const { id } = ticket;

        return id === tempId;
      });
      tempState[index] = patchedTicket;

      return tempState;
    },
    deleteTicketById(state, action) {
      const { tempId } = action.payload;

      return state.filter(obj => {
        const { ticket } = obj;
        const { id } = ticket;
        return tempId !== id;
      });
    }
  }
});

export const {
  getTickets,
  clearTickets,
  addTicket,
  changeTicketInPlace,
  deleteTicketById
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
