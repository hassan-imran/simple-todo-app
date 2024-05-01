import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './todo/task'
import auth from './userAuth/auth';
import error from './userAuth/error';

export const store = configureStore({
  reducer: {
    auth: auth,
    error: error,
    tasks: taskReducer,
  },
})