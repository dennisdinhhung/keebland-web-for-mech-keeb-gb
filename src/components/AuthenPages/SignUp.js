import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthProvider'

function SignUp() {
  const { authUser ,signup } = useAuth()
  const redirect = useNavigate()
  const [signupInfo, setSignUpInfo] = useState({
    username: '',
    password: '',
    reenter: ''
  })

  const handleSubmit = () => {
    signup(signupInfo)
    
    setSignUpInfo({
      username: '',
      password: '',
      reenter: ''
    })

    redirect('/')
  }

  return (
    <div className=''>
      <div className="title">
        Sign Up
      </div>

      <div className="form">
          <input 
            type="text" 
            placeholder='Email'
            value={signupInfo.username}
            onChange={(e) => {
              setSignUpInfo({
                ...signupInfo,
                username: e.target.value
              })
            }}/>

          <input 
            type="password" 
            placeholder='Password'
            value={signupInfo.password}
            onChange={(e) => {
              setSignUpInfo({
                ...signupInfo,
                password: e.target.value
              })
            }}/>

          <input 
            type="password" 
            placeholder='Re-enter Password'
            value={signupInfo.reenter}
            onChange={(e) => {
              setSignUpInfo({
                ...signupInfo,
                reenter: e.target.value
              })
            }}/>

          <button
            onClick={handleSubmit}>
            Sign Up
          </button>
      </div>
    </div>
  )
}

export default SignUp