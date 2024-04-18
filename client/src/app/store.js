import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/todo/taskSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
})