import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    posts: [],
    comments: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        filterPost(state, action){
            const find = state.posts.some(el => el.id === action.payload.id)
            if (find){
                state.posts = state.posts.filter(el => el.id !== action.payload.id)
            }
        },
        editPost(state, action){
            const index = state.posts.findIndex(el => el.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        getComments(state, action){
            state.comments = action.payload
        },
        addPost(state, action) {
            state.posts = [{...action.payload}, ...state.posts]
        }
    },
});

export default postSlice.reducer;
export const {setPosts,getComments, addPost,filterPost,editPost} = postSlice.actions

