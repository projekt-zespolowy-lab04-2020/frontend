import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorReducer from '../errorReducer';

const rootReducer = combineReducers({
  errors: errorReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
