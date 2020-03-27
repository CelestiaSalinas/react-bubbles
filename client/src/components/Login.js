import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'
import styled from 'styled-components'
// import { withFormik, Form, Field } from 'formik'
// import * as Yup from "yup";

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  background: papayawhip;
  border: none;
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: #D9C2ED;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  }
`;

const Label = styled.label`
font-size: 20px;
padding: 30px;
margin: 0 auto;
`

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #431070;
  border: 2px solid #431070;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  margin:30px;
  &:hover {
    background-color: #8b3ad6;
    color: white;
  }`


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
                props.history.push('/homepage')
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    return (
        <div className='container'>
            <h1 className='login-header'>Login</h1>
            <form className='customForm' onSubmit={handleSubmit}>
                <Label className='label' htmlFor='username'> Username:</Label>
                <Input
                    className='input'
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={user.username}
                    onChange={handleChange}
                    required
                />

                <Label className='label' htmlFor='password'> Password:</Label>
                <Input
                    className='input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <Button className='submitButton' type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default Login
