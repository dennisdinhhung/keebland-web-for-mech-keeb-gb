import React from 'react'

import { BsDoorOpenFill } from 'react-icons/bs'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider'

function User() {
  
  const { authUser, logout} = useAuth()
  const redirect = useNavigate()

  if (!authUser){
    return <Navigate to='/login'/>
  }

  const handleLogOut = async () => {
    try {
      await logout();
      redirect('/login')
    } catch {
      console.log('Failed to log out')
    }
  }

  return (
    <div className='OutletCommon'>
      <div className="title">
        User
      </div>

      <button
        className='btn-text'
        onClick={handleLogOut}>
        <BsDoorOpenFill />
        Log Out
      </button>
    </div>
  )
}

export default User