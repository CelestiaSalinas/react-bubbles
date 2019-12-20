import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'
// import { withFormik, Form, Field } from 'formik'
// import * as Yup from "yup";


function Login(props) {
    const [user, setUser] = useState({ username: '', password: '' })

    const handleChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = e => {
        console.log(user)
        e.preventDefault();
        axiosWithAuth()
            .post(`/api/login`, user)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.payload)
                props.history.push('/')
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    return (
        <div className='container'>
            <h1 className='login-header'>Login</h1>
            <form className='customForm' onSubmit={handleSubmit}>
                <label className='label' htmlFor='username'> Username: </label>
                <input
                    className='input'
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={user.username}
                    onChange={handleChange}
                    required
                />

                <label className='label' htmlFor='password'> Password: </label>
                <input
                    className='input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <button onClick={handleSubmit} className='submitButton' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login
