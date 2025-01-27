import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './TodoPage.module.scss';
import Pagination from '../../components/pagination/Pagination';


const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TodoPage = () => {
    const [ todoList, setTodoList ] = useState([]);
    const [offset, setOffset] = useState(0)
    console.log(offset, 'offset');
    const limit = 5
    const page = offset / limit +1
    const handlePrev= () => {
        if (offset > 0 ) setOffset(prevState => prevState - limit)
    }
    const handleNext= () => {
        setOffset(prevState => prevState + limit)
    }


    console.log(todoList, 'todo');
    const getAxios = async(API) => {
        const response = await axios(`${BASE_URL}/${API}?_limit=${limit}&_start=${offset}`);
        console.log(response.data, 'getAxios');
        return response.data;
    };
    useEffect(() => {
        getAxios('todos').then(data => setTodoList(data));
    }, [offset]);



    return (
        <>
            <Pagination prev={handlePrev} page={page} next={handleNext}/>
            <ul className={classes.ul}>
                {todoList.map(todo =>
                    <li key={todo.id} className={`${classes.li} ${todo.completed ? classes.green : classes.red}`}>
                        <p className={classes.liId}>id: {todo.id}</p>
                        <p className={classes.liTitle}>title: {todo.title}</p>
                    </li>
                )}
            </ul>
        </>
    );
};

export default TodoPage;