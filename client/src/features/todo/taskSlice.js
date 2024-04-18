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
        add: (state, action) => {
            state[Date.now()] = {
                text: action.payload,
                completed: false
            }
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
export const { add, toggleComplete, deleteTask } = taskSlice.actions

export default taskSlice.reducer
