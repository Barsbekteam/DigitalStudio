import React, {useState} from 'react';
import {checkAlbum, filterFavorite, setIdPhoto} from "../../../../store/Reducers/AlbumsSlice";
import {BsCheckCircleFill, BsFillSuitHeartFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import EditAlbum from "./EditAlbum";
import {useNavigate} from "react-router-dom";

const AlbumsList = ({el, filterAlbum}) => {
    const {albums} = useSelector(state => state.album)
    const [edit, setEdit] = useState(false)
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleNav = () => {
        dispatch(setIdPhoto(el.id))
        navigate('/photos')
    }
    const handleCheck = () => {
        dispatch(checkAlbum(el))
    }
    return (
        <div className='ll:flex-col md:flex-row ll:w-[90%] flex md:w-2/3  mx-auto justify-between items-center bg-amber-300 m-4 p-4 rounded-xl'>
            <h1 className='text-2xl'>{el.id}: <span
                onClick={handleNav}
                className='cursor-pointer hover:text-cyan-600 font-mono duration-500'>{el.title}</span></h1>
            <div className='flex gap-10 border-4 rounded p-3 border-b-pink-500'>
                <button
                    onClick={() => {
                        dispatch(filterFavorite(el))
                    }}
                    className={`hover:scale-110 text-xl duration-500 text-red-700 heart`}><BsFillSuitHeartFill/></button>
                <button
                    onClick={handleCheck}
                    className={`hover:scale-110 text-xl duration-500 ${el.check ? 'text-pink-500' : ''}`}
                ><BsCheckCircleFill/></button>
                <button onClick={() => setEdit(true)}>Edit</button>
                <button onClick={() => filterAlbum(el)}>Delete</button>
                {edit && <EditAlbum setEdit={setEdit} el={el}/>}
            </div>
        </div>
    );
};

export default AlbumsList;