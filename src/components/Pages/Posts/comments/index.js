import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "../../../../store/Reducers/MainSlice";
import {getComments} from "../../../../store/Reducers/PostSlice";

const Comments = ({el}) => {
    const dispatch = useDispatch()
    const {comments} = useSelector(state => state.post)
    const [c, setC] = useState([])
    const fetchComments = async () => {
        try {
            dispatch(setLoader(true))
            const url = await axios(`https://jsonplaceholder.typicode.com/posts/${el.id}/comments`)
            const {data} = await url
            dispatch(getComments(data))
            dispatch(setLoader(false))
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchComments()
    }, [])
    console.log(comments)
    return (
        <div>
            <h2>Comments</h2>
            {comments.map(el => (
                <div className='m-4 p-4 bg-emerald-300 rounded-2xl'>
                    <h1>name: {el.name} </h1>
                    <h1>email: {el.email} </h1>
                    <h1>comment: {el.body} </h1>

                </div>
            ))}
        </div>
    );
};

export default Comments;