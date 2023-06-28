import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    albums: [],
    limit: JSON.parse(localStorage.getItem('albumLimit')) || 10,
    photo: [],
    photoId: ''
}
const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums(state, action) {
            state.albums = action.payload
        },
        setLimitAlbums(state, action) {
            state.limit = action.payload
        },
        deleteAlbum(state, action) {
            const find = state.albums.some(el => el.id === action.payload.id)
            if (find) {
                state.albums = state.albums.filter(el => el.id !== action.payload.id)
            }
        },
        filterFavorite(state, action) {
            const find = state.albums.find(el => el.id === action.payload.id)
            if (find) {
                find.isDone = !find.isDone
            }
        },
        checkAlbum(state, action) {
            const find = state.albums.find(el => el.id === action.payload.id)
            if (find) {
                find.check = !find.check
            }
        }
        ,
        editAlbum(state, action) {
            const index = state.albums.findIndex(el => el.id === action.payload.id)
            if (index !== -1) {
                state.albums[index] = action.payload
            }
        },
        fetchPhotos(state, action) {
            state.photo = action.payload
        },
        setIdPhoto(state, action) {
            state.photoId = action.payload
        },
        deleteChecks(state, action) {
            state.albums = state.albums.filter(el => el.check === action.payload.check)
        },
        addChecksFavorite(state, action) {
            state.albums.forEach(el => {
                if (el.check !== action.payload.check) {
                    el.isDone = !el.isDone;
                }
            })
        }
    }
})

export default albumSlice.reducer
export const {
    setAlbums,
    addChecksFavorite,
    checkAlbum,
    deleteChecks,
    fetchPhotos,
    setIdPhoto,
    setLimitAlbums,
    editAlbum,
    filterFavorite,
    deleteAlbum
} = albumSlice.actions