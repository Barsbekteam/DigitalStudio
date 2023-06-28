import React, {useState} from 'react';
import {IoCloseCircleOutline} from "react-icons/io5";
import {setLoader} from "../../../../store/Reducers/MainSlice";
import {useDispatch} from "react-redux";
import {editPost} from "../../../../store/Reducers/PostSlice";

const PostEdit = ({setEditValue, el}) => {
    const dispatch = useDispatch()
    const [border, setBorder] = useState(false)
    const [newValues, setNewValues] = useState({
        title: '',
        body: '',
    })
    const handleChange = (e) => {
        setBorder(false)
        setNewValues({...newValues, [e.target.name] : e.target.value})
    }
    const patchPost = async () => {
        if (newValues.title.length && newValues.body.length > 0){
            try {
                dispatch(setLoader(true))
                await fetch(`https://jsonplaceholder.typicode.com/posts/${el.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: newValues.title,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                dispatch(editPost({
                    id: el.id,
                    title: newValues.title,
                    body: newValues.body
                }))
                dispatch(setLoader(false))
                setEditValue('')
            } catch (e) {
                console.log(e)
            }
        }else{
            setBorder(true)
        }
    }
    const handleClose = () => {
        setEditValue(false)
        window.scroll(0, 0)
    }

    return (
        <div>
            <div onClick={handleClose}
                 className="fixed top-0 left-0 right-0 bottom-0 bg-green-300 backdrop-opacity-100"/>
            <div
                className="ll:w-[90%] fixed bg-amber-300 rounded flex justify-center items-center flex-col gap-2 left-[50%] translate-y-[-50%] translate-x-[-50%] top-[50%] md:w-[500px] h-[400px]">
                <IoCloseCircleOutline
                    onClick={handleClose}
                    className="absolute hover:scale-125 duration-500 top-6 right-6 text-2xl text-red-700 cursor-pointer"/>
                <input type="text"
                       placeholder='title'
                       name='title'
                       value={newValues.title}
                       onChange={handleChange}
                       className={`border-2  px-3 py-1 w-2/3 rounded outline-0 text-cyan-600 text-xl ${border && 'border-red-600'}`}/>
                <input type='text'
                       name='body'
                       placeholder='body'
                       value={newValues.body}
                       onChange={handleChange}
                       className={`border-2  px-3 py-1 w-2/3 rounded outline-0 text-cyan-600 text-xl ${border && 'border-red-600'}`}/>
                <div className='flex gap-3'>
                    <button onClick={handleClose}
                            className='py-2 px-4 bg-red-600 text-fuchsia-100 rounded-[10px]'>Close
                    </button>
                    <button
                        onClick={() => patchPost(el)}
                        className='py-2 px-4 bg-green-600 text-fuchsia-100 rounded-[10px]'>Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostEdit;