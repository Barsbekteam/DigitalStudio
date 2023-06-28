import React from 'react';

const UserNames = ({el}) => {
    return (
        <div className="max-[451]:w-[90%] w-[35%]">
            <h1>Name: {el.name}</h1>
            <h1>UserName: {el.username}</h1>
            <h1>email: {el.email}</h1>
        </div>
    );
};

export default UserNames;