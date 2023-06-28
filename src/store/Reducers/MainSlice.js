import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loader: false
}
const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setLoader(state, action) {
            state.loader = action.payload
        }
    }
})

export default mainSlice.reducer
export const {setLoader} = mainSlice.actions