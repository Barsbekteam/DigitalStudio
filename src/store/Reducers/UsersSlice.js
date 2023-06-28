import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    favorite: []
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers(state, action){
            state.users = action.payload
        },
        addFavorite(state, action){
            const find = state.favorite.some(el => el.id === action.payload.id)
            if (!find){
                state.favorite = [action.payload, ...state.favorite,]
            }else {
                state.favorite = state.favorite.filter(el => el.id !== action.payload.id)
            }
        },
        filterUser(state, action){
            const find = state.users.some(el => el.id === action.payload.id)
            if (find){
                state.users = state.users.filter(el => el.id !== action.payload.id)
            }
        }
    }
})

export const {getUsers, addFavorite,filterUser} = userSlice.actions
export default userSlice.reducer