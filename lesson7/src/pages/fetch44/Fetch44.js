import React, { useEffect, useState } from 'react';
import classes from './Fetch44.module.scss';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'
const Fetch44 = () => {

    const [students, setStudents] = useState(null)
    console.log(students, 'students');
    const getAPI = async (API) => {
        const response = await fetch(`${BASE_URL}/${API}`)
        const data =await response.json()
        return data
    }

    const postStudents = async (API) => {
        const response = await fetch(`${BASE_URL}/${API}`, {
            method: "POST",
            headers: {
                "Content-type" : "application-json"
            },
            body: JSON.stringify({
                id: students.length===0 ? '1' : String(Number(students[students.length-1].id)+1),
                surname: "Sariev",
                name: "Baktybek",
                groupId: 4
            })
        })
        console.log(response, 'post')
        getAPI('student').then(data=> setStudents(data))
    }

    const postAxios = async (API) => {
        const response = await axios.post(`${BASE_URL}/${API}`, {
            id: students.length===0 ? '1' : String(Number(students[students.length-1].id)+1),
            surname: "Sariev",
            name: "Baktybek",
            groupId: 4
        })
        console.log(response,'postAxios');
        getAPI('student').then(data=> setStudents(data))
    }
    const putAxios = async (API, id) => {
        const response = await axios.put(`${BASE_URL}/${API}/${id}`, {
            id,
            surname: "Sariev",
            name: "Baktybek",
            groupId: 4
        })
        console.log(response,'postAxios');
        getAPI('student').then(data=> setStudents(data))
    }
    const patchAxios = async (API, id) => {
        const response = await axios.patch(`${BASE_URL}/${API}/${id}`, {
            surname: "Kuban"
        })
        console.log(response,'postAxios');
        getAPI('student').then(data=> setStudents(data))
    }
    const deleteAxios = async (API, id) => {
        const response = await axios.delete(`${BASE_URL}/${API}/${id}`)
        console.log(response,'postAxios');
        getAPI('student').then(data=> setStudents(data))
    }
    const getAxios = async (API) => {
        const response = await axios(`${BASE_URL}/${API}`)
        console.log(response.data,'getAxios');
    }
    useEffect(()=> {
        getAPI('student').then(data=> setStudents(data))
        getAxios('student')
    },[])

    return (
        <div className={classes.wrapper}>
            <button onClick={()=>postStudents('student')}>POST</button>
            <button onClick={()=>postAxios('student')}>POST AXIOS</button>
            <button onClick={()=>putAxios('student', '11')}>PUT AXIOS</button>
            <button onClick={()=>patchAxios('student', '11')}>PATCH AXIOS</button> //надо поставить id который будете изменять
            {
                students?.map(student => <div className={classes.student} key={student.id}>
                    <p>id: {student.id}</p>
                    <p>surname: {student.surname}</p>
                    <p>name: {student.name}</p>
                    <button onClick={()=>deleteAxios('student',student.id)}>delete</button>
                </div>)
            }
        </div>
    );
};

export default Fetch44;