import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import authReducer from './authSlice';
import errorReducer from './errorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    tasks: taskReducer,
  },
})