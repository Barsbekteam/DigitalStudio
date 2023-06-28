import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addNewTodo, fetchTodos} from "../../../store/Reducers/TodoSlice";
import {setLoader} from "../../../store/Reducers/MainSlice";
import TodoList from "./TodoList";

const Todo = () => {
    const dispatch = useDispatch()
    const {todos} = useSelector(state => state.todo)
    const [todoLimit, setTodoLimit] = useState(JSON.parse(localStorage.getItem('todoLimit')) || 10)
    const [value, setValue] = useState('')
    const todo = [10, 20, 50, 100, 200]

    const getTodos = async () => {
        try {
            dispatch(setLoader(true))
            const url = await axios(`https://jsonplaceholder.typicode.com/todos`, {
                params: {_limit: todoLimit}
            })
            const {data} = await url
            dispatch(fetchTodos(data))
            dispatch(setLoader(false))
        } catch (e) {

        }
    }

    const addTodo = async () => {
        if (value.length){
            try {
                dispatch(setLoader(true))
                await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: value
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                dispatch(addNewTodo({
                    id: new Date().toISOString(),
                    title: value,
                    completed: false
                }))
                setValue('')
                dispatch(setLoader(false))

            }catch (e) {
                console.log(e)
            }
        }
    }
    useEffect(() => {
        getTodos()
    }, [todoLimit])

    return (
        <div className='containers pb-10'>
            <form onClick={(e) => e.preventDefault()}
                  className='flex flex-col items-center bg-lime-400 md:w-3/12 ll:w-[70%] mx-auto p-5 gap-5 rounded'>
                <h1 className='text-orange-400 font-bold text-xl'>Add New Todo</h1>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    type="text" placeholder='New Todo'
                    value={value}
                    className='py-1 px-2 rounded outline-0 w-full'
                />
                <button onClick={addTodo}>Add Todo</button>
            </form>
            <div className='flex justify-center md:flex-row ll:flex-col gap-5 m-10'>
                {
                    todo.map(el => (
                        <button onClick={() => {
                            setTodoLimit(el)
                            localStorage.setItem('todoLimit', JSON.stringify(el))
                        }} className='duration-500 focus:bg-amber-300 bg-emerald-400 py-1 px-3 rounded-xl'
                        >{el}-Limits</button>
                    ))
                }
            </div>
            <div>
                <h1 className='text-center text-2xl text-gray-400'>Dont completed works</h1>
                {
                    todos.filter(l => l.completed !== true).map(el => <TodoList el={el}/>)
                }
                <h1 className='text-center text-2xl text-lime-400'>Completed works</h1>
                {
                    todos.filter(l => l.completed === true).map(el => <TodoList el={el}/>)
                }
            </div>
        </div>
    );
};

export default Todo;