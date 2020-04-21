import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorReducer from '../errorReducer';
import userReducer from '../authReducer';
import ticketsReducer from '../ticketsReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  user: userReducer,
  tickets: ticketsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
