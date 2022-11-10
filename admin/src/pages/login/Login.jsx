import React from 'react'
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [ credentials, setCredentials ] = useState({
    username: undefined,
    password: undefined,
  })

  const navigate = useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post('/api/auth/login', credentials)
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      navigate('/')
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  return (
    <div className='login section container'>
        <h1 className='section__title'>Авторизация</h1>
        <div className='login__container section grid'>
          <div className='login__content'>
              <h1 className='login__title'>Введите свой логин</h1>
              <input className={error ? 'login__input error' : 'login__input'} placeholder='Логин' id='username' onChange={handleChange}/>
              <h1 className='login__title'>Введите свой пароль</h1>
              <input className={error ? 'login__input error' : 'login__input'} placeholder='Пароль' id='password' type='password' onChange={handleChange}/>
              <button className='login__btn' disabled={loading} onClick={handleClick}>Войти</button>
              {error && <span className='error'>{error.message}</span>}
          </div>

          <img className='login__img' />
        </div>
    </div>
  )
}

export default Login
