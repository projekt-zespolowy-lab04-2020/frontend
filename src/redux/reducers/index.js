import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import errorReducer from '../errorReducer';
import userReducer from '../authReducer';
import usersCountReducer from '../usersCountReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  user: userReducer,
  usersCount: usersCountReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
