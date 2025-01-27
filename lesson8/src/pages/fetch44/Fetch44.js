import React, { useEffect, useState } from 'react';
import classes from './Fetch44.module.scss';
import axios from 'axios';
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const regex = /^\d+$/;

const schema = Yup.object().shape({
    name: Yup.string().required("обязательное поле").min(3, "минимальное 3"),
    surname: Yup.string()
    .required("обязательное поле")
    .min(2, "минимальное 2"),
    groupId: Yup.string().required("обязательное поле").min(1, "минимальное 3").matches(regex, 'только цифры'),
});


const BASE_URL = 'http://localhost:5000'
const Fetch44 = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        clearErrors,
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
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
    const name = watch('name')
    const surname = watch('surname')
    const groupId = watch('groupId')
    console.log(name, 'name');
    const postAxios = async (API, data) => {
        const response = await axios.post(`${BASE_URL}/${API}`, {
            id: students.length===0 ? '1' : String(Number(students[students.length-1].id)+1),
            surname: data.surname,
            name: data.name,
            groupId: data.groupId
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
    const submit = async (data) => {
        console.log(data);
        await postAxios('student', data)
    };
    const error = (data) => {
        console.log(data);
    };
    return (

        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit(submit, error)}>
                <input type='text'
                       placeholder='Напишите имя'
                    {...register('name')}
                    />
                {errors?.name?.message && <p>{errors.name.message}</p>}
                <input type='text'
                       placeholder='Напишите фамилию'
                       {...register('surname')}
                />
                {errors?.surname?.message && <p>{errors.surname.message}</p>}
                <input type='text'
                       placeholder='Напишите ID группы'
                       {...register('groupId')}
                />
                {errors?.groupId?.message && <p>{errors.groupId.message}</p>}
                <button type='submit' >Отправить</button>
            </form>
            <button onClick={()=>postAxios('student')}>POST AXIOS</button>
            <button onClick={()=>putAxios('student', '11')}>PUT AXIOS</button>
            <button onClick={()=>patchAxios('student', '11')}>PATCH AXIOS</button> //надо поставить id который будете изменять
            <button onClick={()=>postStudents('student')}>POST</button>
            Новая ветка
            {
                students?.map(student => <div className={classes.student} key={student.id}>
                    <p>id: {student.id}</p>
                    <p>surname: {student.surname}</p>
                    <p>name: {student.name}</p>
                    <p>groupId: {student.groupId}</p>
                    <button onClick={()=>deleteAxios('student',student.id)}>delete</button>
                </div>)
            }
        </div>
    );
};

export default Fetch44;