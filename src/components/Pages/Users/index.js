import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, filterUser, getUsers} from "../../../store/Reducers/UsersSlice";
import {setLoader} from "../../../store/Reducers/MainSlice";
import {BsFillStarFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import UserAddress from "./UserAddress";
import UserNames from "./UserNames";


const Users = () => {
    const dispatch = useDispatch()
    const {users, favorite} = useSelector(s => s.user)
    const fetchUsers = async () => {
        try {
            dispatch(setLoader(true))
            const url = await axios(`https://jsonplaceholder.typicode.com/users/`)
            const {data} = await url
            dispatch(getUsers(data))
            dispatch(setLoader(false))
            console.log({users: data})
        }catch (e){
            console.log(e)
        }
    }
    const deleteUser = async (el) => {
        try {
            dispatch(setLoader(true))
            await fetch(`https://jsonplaceholder.typicode.com/users/${el.id}`, {
                method: 'DELETE'
            })
            dispatch(filterUser(el))
            dispatch(setLoader(false))

        }catch (e){
            console.log(e)
        }
    }
    console.log(users)

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div className='containers'>
            <Link className="text-xl text-cyan-600" to={'/favorite'}>See Favorites</Link>
            {
                users.map(el => (
                    <div className="ll:flex-col lg:flex-row ll:w-[90%] bg-amber-300 mt-5 p-5 rounded-xl flex justify-between lg:w-[60%] mx-auto">
                        <UserNames el={el}/>
                        <UserAddress el={el}/>
                        <div className="flex flex-col items-center gap-2">
                            <button className={`${favorite.some(f => f.id === el.id) ? 'text-yellow-500' : ''} rounded  bg-green-500 py-1 px-3 `}
                            onClick={() => dispatch(addFavorite(el))}
                            ><BsFillStarFill/></button>
                            <button className="rounded  bg-red-400 py-1 px-3 "
                            onClick={() => deleteUser(el)}
                            >delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Users;