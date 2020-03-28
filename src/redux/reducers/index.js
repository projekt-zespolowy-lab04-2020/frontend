import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorReducer from '../errorReducer';
import userReducer from '../authReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
