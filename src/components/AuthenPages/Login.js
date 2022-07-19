import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { BsBoxArrowInRight, BsEye, BsEyeSlash, BsGoogle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAllSavedEntry } from '../../state/reducer/action';
import { useAuth } from '../../utils/AuthProvider';
import { auth, signInWithGoogle } from '../../utils/firebase-config';

function Login() {
  const dispatch = useDispatch()
  const savedState = useSelector((state) => state.savedEntry);
  const googleProvider = new GoogleAuthProvider()

  const { allSavedEntry } = savedState

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });

  const [isPasswordVisible, setIsPassswordVisible] = useState(false)
  const [errorLogin, setErrorLogin] = useState();
  const { authUser, login } = useAuth()

  const changePasswordVisibility = () => {
    setIsPassswordVisible(!isPasswordVisible)
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result, 'google result')
      })
      .catch((error) => {
        console.log(error)
      })
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
    }
    catch (error) {
      setErrorLogin('Your username or password is incorrect.')
    }
  }


  return (
    <div className='Login'>
      <div className="title">
        Login
      </div>
      <div className="form">
        <input
          type="text"
          placeholder='Email'
          value={loginInfo.username}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, username: e.target.value })
          }} />

        <div className="div-input">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder='Password'
            value={loginInfo.password}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value })
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
          <BsBoxArrowInRight className='icon icon-signin'/>Sign In
        </button>

        <div className='or'>or</div>

        <button 
          className='google-btn'
          onClick={signInWithGoogle}>
          <BsGoogle className='icon'/>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login