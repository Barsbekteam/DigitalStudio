import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fetchPhotos} from "../../../../store/Reducers/AlbumsSlice";

const Photos = () => {
    const {photoId, photo} = useSelector(state => state.album)
    const dispatch = useDispatch()
    const getPhoto = async () => {
        try {
            const responsive = await axios(`https://jsonplaceholder.typicode.com/albums/${photoId}/photos`)
            const {data} = await responsive
            dispatch(fetchPhotos(data))
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
    getPhoto()
    }, [])
    return (
        <div className={'containers'}>
            {
                photo.map(el => (
                    <div className='relative flex gap-5 mt-5 justify-center items-end'>
                        <img src={el.url} className='w-[50%]' alt=""/>
                        <img src={el.thumbnailUrl} className='w-[15%]' alt=""/>
                    </div>
                ))
            }
        </div>
    );
};

export default Photos;