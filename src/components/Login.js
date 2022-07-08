import React from 'react'
import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import { signInWithGoogle } from '../utils/firebase-config';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });

  const [isPasswordVisible, setIsPassswordVisible] = useState(false)
  const [errorLogin, setErrorLogin] = useState();
  const redirect = useNavigate()
  const { authUser, login } = useAuth()

  if (authUser) {
    return <Navigate to='/' />
  }

  const changePasswordVisibility = () => {
    setIsPassswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //ruins the login function
      await login(loginInfo);

      setLoginInfo({
        username: '',
        password: ''
      })

      redirect('/')
    }
    catch (error) {
      setErrorLogin('Your username or password is incorrect.')
    }
  }

  
  return (
    <div className='OutletCommon'>
      <div className="title">
        Login
      </div>
      <div className="form">
        <input 
          type="text" 
          placeholder='Email'
          value={loginInfo.username}
          onChange={(e) => {
            setLoginInfo({...loginInfo, username: e.target.value})
          }}/>

        <div className="div-input">
          <input 
            type={isPasswordVisible ? "text" : "password"}
            placeholder='Password'
            value={loginInfo.password}
            onChange={(e) => {
              setLoginInfo({...loginInfo, password: e.target.value})
            }}
          />

          <div
            className='icon-eye'
            onClick={changePasswordVisibility}>
            {isPasswordVisible ? <BsEye /> : <BsEyeSlash />}
          </div>
        </div>

        <div className="error">
          {errorLogin}
        </div>

        <button
          onClick={handleSubmit}>
          Sign In
        </button>

        <button onClick={signInWithGoogle}>Sign in with Google</button>

        <div className="log-in">
          Don't have an account? <button onClick={() => redirect('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Login