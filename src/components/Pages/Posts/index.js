import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addPost, filterPost, setPosts} from "../../../store/Reducers/PostSlice";
import {setLoader} from "../../../store/Reducers/MainSlice";
import {IoCloseCircleOutline} from "react-icons/io5";
import PostEdit from "./PostEdit";
import PostList from "./PostList";

const Posts = () => {

    const dispatch = useDispatch()
    const [postValue, setPostValue] = useState({
        userId: new Date().toISOString(),
        id: new Date().toISOString(),
        title: '',
        body: ''
    })
    const [value, setValue] = useState(null)
    const [border, setBorder] = useState(false)
    const [borderPost, setBorderPost] = useState(false)
    const {posts} = useSelector(state => state.post)
    const [limit, setLimit] = useState(JSON.parse(localStorage.getItem('limit',)) || 10)
    const fetchPosts = async () => {
        try {
            dispatch(setLoader(true))
            const url = await axios(`https://jsonplaceholder.typicode.com/posts/`, {
                params: {_page: 1, _limit: limit}
            })
            const {data} = await url
            dispatch(setPosts(data))
            dispatch(setLoader(false))
        } catch (e) {
            console.log(e)
        }
    }
    const deletePost = async (id) => {
        try {
            dispatch(setLoader(true))
            const responsive = await fetch(`https://jsonplaceholder.typicode.com/posts/${id.id}`, {
                method: 'DELETE'
            })
            dispatch(filterPost(id))
            dispatch(setLoader(false))

        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handlePostChange = (e) => {
        setPostValue({...postValue, [e.target.name]: e.target.value})
        setBorderPost(false)
    }

    const handleClickPost = () => {
        if (postValue.title.length && postValue.body.length > 0){
            dispatch(addPost(postValue))
            setPostValue({
                id: '',
                userId: '',
                title: '',
                body: ''
            })
            setBorderPost(false)
        } else {
            setBorderPost(true)
        }
    }
    const handleClickLimit = () => {
        if (value.length > 0) {
            setLimit(value)
            localStorage.setItem('limit', JSON.stringify(value))
            setValue('')
            setBorder(false)
        } else {
            setBorder(true)
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [limit])
    console.log()
    return (
        <div className='containers flex flex-col items-center'>
            <div>
                <input
                    className={`border-2 ${border ? 'border-red-600' : 'border-emerald-500'} rounded p-1`}
                    placeholder='Set limit'
                    value={value}
                    type="number" onChange={handleChange}/>
                <button className='ml-2 px-3 py-2 rounded bg-emerald-300'
                        onClick={handleClickLimit}>Ok
                </button>
                <form
                    className='bg-emerald-300 p-5 flex-col flex gap-3 mt-4'
                    onClick={(e) => e.preventDefault()}>
                    <input type="text"
                           className={`${borderPost ? 'border-b-red-500' : ''} rounded py-1 px-3 border-2 border-b-blue-500`}
                           name='title'
                           value={postValue.title}
                           placeholder='title'
                           onChange={handlePostChange}
                    />
                    <input type="text"
                           className={`${borderPost ? 'border-b-red-500' : ''} rounded py-1 px-3 border-2 border-b-blue-500`}
                           name='body'
                           value={postValue.body}
                           placeholder='body'
                           onChange={handlePostChange}
                    />
                    <button
                        onClick={handleClickPost}
                        className='bg-amber-300 rounded py-1 text-xl font-medium'>Add Post</button>
                </form>
            </div>
            {
                posts.map(el => <PostList el={el} deletePost={deletePost} key={el.id}/>)
            }
        </div>
    );
};

export default Posts;