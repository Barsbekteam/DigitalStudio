import { configureStore } from "@reduxjs/toolkit";
import postReducer from './Reducers/PostSlice'
import mainReducer from './Reducers/MainSlice'
import userReducer from './Reducers/UsersSlice'
import albumsReducer from "./Reducers/AlbumsSlice";
import todosReducer from "./Reducers/TodoSlice"

export default configureStore({
    reducer: {
        main: mainReducer,
        post: postReducer,
        user: userReducer,
        album: albumsReducer,
        todo: todosReducer
    }
});
