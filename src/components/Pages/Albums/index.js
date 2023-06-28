import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
    addChecksFavorite,
    deleteAlbum,
    deleteChecks,
    filterFavorite,
    setAlbums,
    setLimitAlbums
} from "../../../store/Reducers/AlbumsSlice";
import {setLoader} from "../../../store/Reducers/MainSlice";
import {BsFillSuitHeartFill} from "react-icons/bs";
import AlbumsList from "./AlbumsList";
import AlbumListN from "./AlbumsList/AlbumListN";

const Albums = () => {
    const dispatch = useDispatch()
    const {albums, limit} = useSelector(state => state.album)
    const [limitValue, setLimitValue] = useState('')
    const fetchAlbums = async () => {
        try {
            dispatch(setLoader(true))
            const url = await axios(`https://jsonplaceholder.typicode.com/albums/`, {
                params: {_limit: limit}
            })
            const {data} = await url
            dispatch(setAlbums(data))
            dispatch(setLoader(false))
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }
    const filterAlbum = async (id) => {
        try {
            dispatch(setLoader(true))
            await fetch(`https://jsonplaceholder.typicode.com/albums/${id.id}`, {
                method: 'DELETE'
            })
            dispatch(deleteAlbum(id))
            dispatch(setLoader(false))
        } catch (e) {
            console.log()
        }
    }
    const handleChange = (e) => {
        setLimitValue(e.target.value)
    }
    const handleClick = () => {
        dispatch(setLimitAlbums(limitValue))
        localStorage.setItem('albumLimit', JSON.stringify(limitValue))
        setLimitValue('')
    }
    console.log(limitValue)
    useEffect(() => {
        fetchAlbums()
    }, [limit])
    return (
        <div className='mt-[-20px] pt-4 pb-4 h-full'>
            <div className='containers'>

                <div className='flex justify-center mt-5'>
                    <form
                        className='flex rounded gap-3 justify-center bg-amber-300 py-2 w-[30%] px-2'
                        onClick={(e) => e.preventDefault()}>
                        <input onChange={handleChange} type="text" value={limitValue} placeholder='Set Limit'
                               className="w-full ml-2 py-2 px-3 rounded"/>
                        <button onClick={handleClick}>Ok</button>
                    </form>
                </div>
                <div className='flex gap-5 justify-center mb-10 mt-5'>
                    <button
                        className='py-2 px-4 bg-emerald-300 rounded'
                        onClick={() => dispatch(deleteChecks(albums))}>Delete Checks</button>
                    <button
                        className='py-2 px-4 bg-emerald-300 rounded'
                        onClick={() => dispatch(addChecksFavorite(albums))}>Add Checks to Favorite</button>
                </div>
                <h2 className="text-xl font-semibold text-white text-center mt-5">Favorite</h2>
                {
                    albums.filter(e => e.isDone).map(el => <AlbumsList el={el} filterAlbum={filterAlbum}/>)
                }
                <h2 className="text-xl font-semibold text-white text-center mt-5">Not a Favorite</h2>
                {
                    albums.filter(e => !e.isDone).map(el => <AlbumListN el={el} filterAlbum={filterAlbum}/>)
                }
            </div>
        </div>
    );
};

export default Albums;