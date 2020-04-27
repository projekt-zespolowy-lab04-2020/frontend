import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ticketCreatorReducer from '../ticketCreatorReducer';
import userReducer from '../authReducer';
import ticketsReducer from '../ticketsReducer';

const rootReducer = combineReducers({
  ticketCreator: ticketCreatorReducer,
  user: userReducer,
  tickets: ticketsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
