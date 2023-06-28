import React from 'react';

const UserAddress = ({el}) => {
    return (
        <div className="max-[451]:w-[90%] w-1/5">
            <h1>City: {el.address.city}</h1>
            <h1>Street: {el.address.street}</h1>
            <h1>Suite: {el.address.suite}</h1>
        </div>
    );
};

export default UserAddress;