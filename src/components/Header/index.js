import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className='bg-emerald-300 mb-5'>
            <div className="containers flex gap-10 justify-center p-7 text-amber-700 font-bold text-xl ">
                <NavLink className='hover:text-fuchsia-600 hover:scale-110 duration-500' to={'/'}>Posts</NavLink>
                <NavLink className='hover:text-fuchsia-600 hover:scale-110 duration-500' to={'/users'}>Users</NavLink>
                <NavLink className='hover:text-fuchsia-600 hover:scale-110 duration-500' to={'/albums'}>Albums</NavLink>
                <NavLink className='hover:text-fuchsia-600 hover:scale-110 duration-500' to={'/todo'}>Todos</NavLink>
            </div>
        </div>
    );
};

export default Header;