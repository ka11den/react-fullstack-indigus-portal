import axios from 'axios'
import React, { useContext, useState } from 'react'
import login from '../images/login.png'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  
  const [ credentials, setCredentials ] = useState({
    username: undefined,
    email: undefined,
    fio: undefined,
    password: undefined,
  })

  const navigate = useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/register', credentials)
      navigate('/login')
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  return (
    <div className='login section'>       
        <div className='login__container section grid'>
        <div className='login__content'>
          <img className='login__img' src={login} />
          <h1 className='register__title'>Придумайте логин</h1>
          <input className={error ? 'login__input error' : 'login__input'} placeholder='ivan2009' id='username' onChange={handleChange} />
          <h1 className='register__title'>Ввдетие вашу почту</h1>
          <input className={error ? 'login__input error' : 'login__input'} placeholder='test@mail.ru' id='email' onChange={handleChange} />
          <h1 className='register__title'>Ввдетие Ф.И.О</h1>
          <input className={error ? 'login__input error' : 'login__input'} placeholder='Иванов Иван Иванович' id='fio' onChange={handleChange} />
          <h1 className='register__title'>Придумайте пароль</h1>
          <input className={error ? 'login__input error' : 'login__input'} placeholder='123' id='password' type='password' onChange={handleChange} />
          <button className='register__btn' disabled={loading} onClick={handleClick}>Войти</button>
          {error && <span className='error'>{error.message}</span>}
        </div>        
      </div>
    </div>
  )
}

export default Register