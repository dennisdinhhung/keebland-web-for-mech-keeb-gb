import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
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
  const redirect = useNavigate()
  const { authUser, login } = useAuth()

  const changePasswordVisibility = () => {
    setIsPassswordVisible(!isPasswordVisible)
  }

  const isIncluded = (uid) => {
    console.log(allSavedEntry, 'all entry')
    allSavedEntry.map((savedEntry) => {
      console.log(savedEntry.uid, 'save uid')
      if (savedEntry.uid === uid) {
        return true
      }
    })

    return false
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result, 'google result')
        // dispatch(getAllSavedEntry())

        // const isIncludes = isIncluded(result.uid)
        // console.log(isIncludes, 'test')

        // if (!isIncludes) {
        //   // create new doc
        //   console.log('create')
        // }

        // redirect('/')
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


      // redirect('/')

      // //TODO: check if the savedEntry for this user exists
    }
    catch (error) {
      setErrorLogin('Your username or password is incorrect.')
    }
  }


  return (
    <div className=''>
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
          Sign In
        </button>

        <div>or</div>

        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login