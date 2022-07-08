import React from 'react'
import { BsList, BsSearch, BsDoorOpenFill } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { MdKeyboardTab } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import '../static/css/NavBar.scss'
import { useAuth } from '../utils/AuthProvider'

function NavBar() {
  const redirect = useNavigate();
  const { authUser, logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
      redirect('/')
    } catch {
      console.log('Failed to log out')
    }
  }

  return (
    <div className='NavBar'>
      {/* <button>
                <BsList />
            </button> */}

      {//TODO: img or svg here
      }

      <div
        className='logo'
        onClick={() => {
          redirect('/')
        }}>
        <MdKeyboardTab className='icon' />
        KEEBLAND
      </div>

      <div className='auth-div'>
        <button className='btn-search'><FiSearch /></button>
        {authUser ? (
          <div>
            <button
              className='btn-text'
              onClick={handleLogOut}>
              <BsDoorOpenFill />
              Log Out
            </button>
          </div>
        ) :
          (
            <div>
              <button
                className='btn-text'
                onClick={() => redirect('/login')}>
                Login
              </button>
              <button
                className='btn-text'
                onClick={() => redirect('/signup')}>
                Sign Up
              </button>
            </div>
          )}
      </div>

    </div>
  )
}

export default NavBar