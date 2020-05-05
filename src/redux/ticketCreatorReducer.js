import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isEditMode: false,
  ticketIdToEdit: -1
};

const ticketCreator = createSlice({
  name: 'TicketCreator',
  initialState,
  reducers: {
    toggleOpen(state, action) {
      return {
        ...state,
        isOpen: action.payload
      };
    },
    toggleEditMode(state, action) {
      return {
        ...state,
        isEditMode: action.payload
      };
    },
    setTicketIdToEdit(state, action) {
      return {
        ...state,
        ticketIdToEdit: action.payload
      };
    }
  }
});

export const {
  toggleOpen,
  toggleEditMode,
  setTicketIdToEdit
} = ticketCreator.actions;

export default ticketCreator.reducer;
