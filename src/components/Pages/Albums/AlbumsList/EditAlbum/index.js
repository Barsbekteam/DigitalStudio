import React, {useState} from 'react';
import {IoCloseCircleOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../../../store/Reducers/MainSlice";
import {editAlbum} from "../../../../../store/Reducers/AlbumsSlice";

const EditAlbum = ({el, setEdit}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const handleEdit = async () => {
        if (value.length > 0){
            try {
                dispatch(setLoader(true))
                await fetch(`https://jsonplaceholder.typicode.com/posts/${el.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: value,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                dispatch(editAlbum({
                    id: el.id,
                    title: value
                }))
                setValue('')
                setEdit(false)
                dispatch(setLoader(false))
            }catch (e){
                console.log(e)
            }
        }
    }
    return (
        <form
            onClick={(e) => e.preventDefault()}
            className='ll:w-[90%] fixed gap-5 flex flex-col justify-center items-center h-72 lm:w-96 bg-white rounded left-[50%] translate-y-[-50%] translate-x-[-50%] top-[50%]' >
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className='border-2 border-amber-500' type="text"/>
            <button
                onClick={handleEdit}
                className='py-2 px-4 bg-green-600 text-fuchsia-100 rounded-[10px]'>Save
            </button>
            <IoCloseCircleOutline
                onClick={() => setEdit(false)}
                className="absolute hover:scale-125 duration-500 top-6 right-6 text-2xl text-red-700 cursor-pointer"/>
        </form>
    );
};

export default EditAlbum;