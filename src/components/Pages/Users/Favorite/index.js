import React from 'react';
import {addFavorite} from "../../../../store/Reducers/UsersSlice";
import {BsFillStarFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Favorite = () => {
    const {favorite} = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <div className='containers pb-[150px]'>

            {
                favorite.length > 0 ?
                favorite.map(el => (
                    <div className="ll:flex-col md:flex-row max-[768px]:w-[90%] bg-amber-300 m-5 p-5 rounded-xl flex justify-between w-[60%] mx-auto">
                        <div className="w-[35%]">
                            <h1>Name: {el.name}</h1>
                            <h1>UserName: {el.username}</h1>
                            <h1>email: {el.email}</h1>
                        </div>
                        <div className="w-1/5">
                            <h1>City: {el.address.city}</h1>
                            <h1>Street: {el.address.street}</h1>
                            <h1>Suite: {el.address.suite}</h1>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button className={`${favorite.some(f => f.id === el.id) ? 'text-yellow-500' : ''} rounded  bg-green-500 py-1 px-3 `}
                                    onClick={() => dispatch(addFavorite(el))}
                            ><BsFillStarFill/></button>
                        </div>
                    </div>
                )) :
                    <Link to={'/users'}>
                        Add to favorite
                    </Link>
            }
        </div>
    );
};

export default Favorite;