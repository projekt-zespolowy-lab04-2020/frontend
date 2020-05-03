import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: []
};

const ticketsSlice = createSlice({
  name: 'Tickets',
  initialState,
  reducers: {
    getTickets(state) {
      return state;
    },
    clearTickets(state) {
      return {
        ...state,
        tickets: []
      };
    },
    addTicket(state, action) {
      const tempTickets = [...state.tickets];
      tempTickets.push(action.payload);

      return {
        ...state,
        tickets: tempTickets
      };
    },
    changeTicketInPlace(state, action) {
      const { tempId, patchedTicket } = action.payload;
      const tempState = [...state.tickets];

      const index = state.tickets.findIndex(obj => {
        const { ticket } = obj;
        const { id } = ticket;

        return id === tempId;
      });
      tempState[index] = patchedTicket;

      return {
        ...state,
        tickets: tempState
      };
    },
    deleteTicketById(state, action) {
      const { tempId } = action.payload;

      return {
        ...state,
        tickets: state.tickets.filter(obj => {
          const { ticket } = obj;
          const { id } = ticket;
          return tempId !== id;
        })
      };
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
