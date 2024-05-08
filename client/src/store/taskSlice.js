import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    '1': {
        text: 'Dummy Task',
        completed: false
    },
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateAllTasks: (state, action) => {
            // Instead of directly mutating the state object, you should return a new state object with the updated data
            return action.payload;
        },
        toggleComplete: (state, action) => {
            const todo = state[action.payload];
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTask: (state, action) => {
            delete state[action.payload];
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateAllTasks, toggleComplete, deleteTask } = taskSlice.actions

export default taskSlice.reducer