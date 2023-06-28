import React from 'react';
import {completedTodo} from "../../../../store/Reducers/TodoSlice";
import {GiCheckMark} from "react-icons/gi";
import {useDispatch} from "react-redux";

const TodoList = ({el}) => {
    const dispatch = useDispatch()
    return (
        <div
            className='w-[55%] flex justify-between items-center mx-auto m-3 p-5 bg-amber-300 rounded-xl'>
            <div>
                <h1 className='text-xl'>{el.id}: <span
                    className={`${el.completed ? 'line-through' : ''}`}>{el.title}</span></h1>
            </div>
            <div>
                <button
                    onClick={() => dispatch(completedTodo(el))}
                    className={`${el.completed ? 'bg-emerald-600' : ''} p-2 bg-emerald-300 rounded-xl`}>
                    <GiCheckMark className={`${el.completed ? 'text-white' : 'text-gray-500'}`}/></button>
            </div>
        </div>
    );
};

export default TodoList;