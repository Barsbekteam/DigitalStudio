import React, {useEffect, useState} from 'react';
import PostEdit from "../PostEdit";
import {useDispatch} from "react-redux";
import axios from "axios";
import Comments from "../comments";

const PostList = ({el, deletePost}) => {
    const [editValue, setEditValue] = useState(false)
    const [modal, setModal] = useState(false)

    return (
        <div className='ll:w-full md:w-[65%] duration-500 flex-col bg-amber-300 m-5 p-4 rounded mx-auto flex items-center justify-between'>
            <div className='flex duration-500 items-center gap-3 md:flex-row ll:flex-col'>
                <div className="w-[66%] ll:w-[90%] ">
                    <div className="flex">
                        <h1>{el.id}: <span className='text-xl'>{el.title}</span></h1>
                    </div>
                    <h1 className='text-xl'>{el.body}</h1>
                </div>
                <div className='flex gap-3 ll:flex-row md:flex-col'>
                    <button
                        onClick={() => setModal(!modal)}
                        className={`rounded  bg-green-600 py-1 px-3`}>comments
                    </button>
                    <button
                        onClick={() => setEditValue(true)}
                        className={`rounded  bg-green-600 py-1 px-3`}>edit
                    </button>
                    <button className="rounded  bg-red-400 py-1 px-3"
                            onClick={() => deletePost(el)}
                    >delete
                    </button>
                </div>
                {
                    editValue && <PostEdit setEditValue={setEditValue} el={el} key={el.id}/>
                }
            </div>
            <div className='overflow-hidden'>
                <div className={`${modal ? 'translate-y-0' : 'translate-y-[-100px]'} duration-1000`}>
                    {modal && <Comments el={el}/>}
                </div>
            </div>
        </div>
    );
};

export default PostList;