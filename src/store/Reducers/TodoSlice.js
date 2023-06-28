import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: []
}
const todosSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchTodos(state, action) {
            state.todos = action.payload
        },
        addNewTodo(state, action) {
            state.todos = [{...action.payload}, ...state.todos]
        },
        completedTodo(state, action) {
            const find = state.todos.find(el => el.id === action.payload.id)
            find.completed = !find.completed
        }
    }
})
export default todosSlice.reducer
export const {fetchTodos, addNewTodo, completedTodo} = todosSlice.actions